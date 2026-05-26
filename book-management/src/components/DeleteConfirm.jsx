const DeleteConfirm = ({ book, onConfirm, onCancel, loading }) => (
  <div className="delete-confirm">
    <div className="delete-confirm__icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <h3 className="delete-confirm__title">Delete &ldquo;{book.title}&rdquo;?</h3>
    <p className="delete-confirm__meta">
      {book.author} · {book.year}
    </p>
    <p className="delete-confirm__warning">
      This book will be permanently removed from your library. This action cannot be undone.
    </p>
    <div className="delete-confirm__actions">
      <button className="btn-ghost" onClick={onCancel} disabled={loading}>
        Cancel
      </button>
      <button className="btn-danger" onClick={onConfirm} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  </div>
);

export default DeleteConfirm;