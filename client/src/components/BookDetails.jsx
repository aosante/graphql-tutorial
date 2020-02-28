import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = props => {
  const { book } = props.data;

  return (
    <div id="book-details">
      <h1>Output book details</h1>
      {book ? (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book ? book.author.books.map(bk => <li>{bk.name}</li>) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
