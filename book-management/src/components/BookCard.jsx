import GenreBadge from './GenreBadge';

const BookCard = ({ book, onEdit, onDelete, featured = false }) => (
  <div className={`book-card${featured ? ' featured' : ''}`}>
    <div className="book-card__meta">
      <GenreBadge genre={book.genre} />
      <div className="book-card__actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book)}>Delete</button>
      </div>
    </div>

    <h2 className="book-card__title">{book.title}</h2>
    <p className="book-card__author">{book.author} · {book.year}</p>

    {book.description && (
      <p className="book-card__desc">{book.description}</p>
    )}
  </div>
);

export default BookCard;