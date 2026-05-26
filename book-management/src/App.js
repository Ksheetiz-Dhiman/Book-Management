import { useState, useEffect } from 'react';
import * as booksApi from './api/books';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import DeleteConfirm from './components/DeleteConfirm';
import Toast from './components/Toast';
import { GENRES } from './components/BookForm';
import './styles/global.css';

function App() {
  const [books, setBooks]                 = useState([]);
  const [loading, setLoading]             = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState('');
  const [filterGenre, setFilterGenre]     = useState('All');
  const [modal, setModal]                 = useState(null);
  const [toast, setToast]                 = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const loadBooks = () => {
    setLoading(true); setError(null);
    booksApi.getBooks()
      .then(data => setBooks(data))
      .catch(() => setError('Failed to load books. Check your API URL.'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { loadBooks(); }, []);

  const handleAdd = async (form) => {
    setActionLoading(true);
    try { const nb = await booksApi.addBook(form); setBooks(p => [...p, nb]); setModal(null); showToast('Book added'); }
    catch { showToast('Failed to add book', 'error'); }
    finally { setActionLoading(false); }
  };

  const handleUpdate = async (form) => {
    setActionLoading(true);
    try { const ub = await booksApi.updateBook({ ...form, id: modal.book.id }); setBooks(p => p.map(x => x.id === ub.id ? ub : x)); setModal(null); showToast('Book updated'); }
    catch { showToast('Failed to update book', 'error'); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try { await booksApi.deleteBook(modal.book.id); setBooks(p => p.filter(x => x.id !== modal.book.id)); setModal(null); showToast('Book deleted'); }
    catch { showToast('Failed to delete book', 'error'); }
    finally { setActionLoading(false); }
  };

  const filtered = books.filter(b => {
    const q = search.toLowerCase();
    return (
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q)) &&
      (filterGenre === 'All' || b.genre === filterGenre)
    );
  });

  const usedGenres = [...new Set(books.map(b => b.genre))].sort();
  const isFiltering = search || filterGenre !== 'All';

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__brand">
            <h1>Bookshelf</h1>
            <span>{books.length}</span>
          </div>
          <button className="btn-primary" onClick={() => setModal({ type: 'add' })}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Book
          </button>
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className="app__toolbar">
        <div className="app__toolbar-inner">
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="toolbar__right">
            <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)}>
              <option value="All">All Genres</option>
              {usedGenres.map(g => <option key={g}>{g}</option>)}
            </select>
            {isFiltering && (
              <button className="btn-ghost" onClick={() => { setSearch(''); setFilterGenre('All'); }}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="app__main">
        {loading ? (
          <div className="state state--loading">
            <div className="spinner spinner--dark spinner--lg" />
            <p>Loading your library...</p>
          </div>
        ) : error ? (
          <div className="state state--error">
            <p>{error}</p>
            <button className="btn-ghost" onClick={loadBooks}>Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="state state--empty">
            <h3>{isFiltering ? 'No matches found' : 'Your library is empty'}</h3>
            <p>{isFiltering ? 'Try adjusting your search or filters' : 'Add your first book to get started'}</p>
            {!isFiltering && (
              <button className="btn-primary" onClick={() => setModal({ type: 'add' })}>
                Add First Book
              </button>
            )}
          </div>
        ) : (
          <>
            {isFiltering && (
              <div className="results-bar">
                <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                {filterGenre !== 'All' && <span className="results-bar__tag">{filterGenre}</span>}
              </div>
            )}

            <div className="book-grid">
              {filtered.map((book, i) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={b => setModal({ type: 'edit', book: b })}
                  onDelete={b => setModal({ type: 'delete', book: b })}
                  featured={i === 0 && !isFiltering}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Modals ── */}
      {modal && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget && !actionLoading) setModal(null); }}>
          <div className="modal">
            <div className="modal__header">
              <h2>
                {modal.type === 'add' ? 'Add Book' : modal.type === 'edit' ? 'Edit Book' : 'Delete Book'}
              </h2>
              {modal.type !== 'delete' && (
                <button className="modal__close" onClick={() => !actionLoading && setModal(null)} aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="modal__body">
              {modal.type === 'add'    && <BookForm onSave={handleAdd} onCancel={() => setModal(null)} loading={actionLoading} />}
              {modal.type === 'edit'   && <BookForm initial={modal.book} onSave={handleUpdate} onCancel={() => setModal(null)} loading={actionLoading} />}
              {modal.type === 'delete' && <DeleteConfirm book={modal.book} onConfirm={handleDelete} onCancel={() => setModal(null)} loading={actionLoading} />}
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}

export default App;