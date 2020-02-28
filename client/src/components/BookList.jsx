import React, { useState } from 'react';
import BookDetails from './BookDetails';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

const BookList = props => {
  // tracks the id of the selected book
  const [selected, setSelected] = useState(null);
  const books = props.data.loading ? [] : props.data.books;

  return (
    <div>
      <ul id="book-list">
        {books
          ? books.map(book => (
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(book.id)}
                key={book.id}
              >
                {book.name}
              </li>
            ))
          : null}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
