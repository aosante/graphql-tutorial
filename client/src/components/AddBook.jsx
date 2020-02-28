import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

const AddBook = props => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const { name, genre, authorId } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, genre, authorId } = formData;
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      // refetch query to update list after book creations
      refetchQueries: [{ query: getBooksQuery }]
    });
    // use add book mutation here;\
  };

  // now that there are composed queries, properties such as "loading"
  // are now under the "queryName" property instead of the data property
  const authors = props.getAuthorsQuery.loading
    ? []
    : props.getAuthorsQuery.authors;

  return (
    <form id="add-book" onSubmit={e => onSubmit(e)}>
      <div className="field">
        <label>Book name:</label>
        <input
          name="name"
          onChange={e => onChange(e)}
          value={name}
          type="text"
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          name="genre"
          onChange={e => onChange(e)}
          value={genre}
          type="text"
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={e => onChange(e)} name="authorId" value={authorId}>
          <option value="">Select author</option>
          {/* render authors */}
          {authors
            ? authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            : null}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
