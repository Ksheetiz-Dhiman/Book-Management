const GENRE_COLORS = {
  Fiction:       'genre-fiction',
  'Non-Fiction': 'genre-nonfiction',
  Science:       'genre-science',
  History:       'genre-history',
  Biography:     'genre-biography',
  Mystery:       'genre-mystery',
  Fantasy:       'genre-fantasy',
  Romance:       'genre-romance',
  Thriller:      'genre-thriller',
  'Self-Help':   'genre-selfhelp',
  Technology:    'genre-technology',
  Philosophy:    'genre-philosophy',
};

const GenreBadge = ({ genre }) => {
  const genreClass = GENRE_COLORS[genre] || 'genre-default';
  return (
    <span className={`badge ${genreClass}`}>
      {genre}
    </span>
  );
};

export default GenreBadge;