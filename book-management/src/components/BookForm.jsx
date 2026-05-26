import { useState } from 'react';

export const GENRES = [
  'Fiction', 'Non-Fiction', 'Science', 'History', 'Biography',
  'Mystery', 'Fantasy', 'Romance', 'Thriller', 'Self-Help', 'Technology', 'Philosophy',
];

const EMPTY_FORM = {
  title: '', author: '', genre: 'Fiction',
  year: new Date().getFullYear(), description: '',
};

const BookForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim())  e.title  = 'Required';
    if (!form.author.trim()) e.author = 'Required';
    const y = Number(form.year);
    if (!form.year || y < 1000 || y > 2100) e.year = 'Invalid year';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave({ ...form, year: Number(form.year) });
  };

  return (
    <div>
      <div className="book-form__row">
        <label className="label">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="Enter book title"
          className={errors.title ? 'err' : ''}
        />
        {errors.title && <p className="error-msg">{errors.title}</p>}
      </div>

      <div className="book-form__row">
        <label className="label">Author</label>
        <input
          type="text"
          value={form.author}
          onChange={e => set('author', e.target.value)}
          placeholder="Enter author name"
          className={errors.author ? 'err' : ''}
        />
        {errors.author && <p className="error-msg">{errors.author}</p>}
      </div>

      <div className="book-form__grid">
        <div>
          <label className="label">Genre</label>
          <select value={form.genre} onChange={e => set('genre', e.target.value)}>
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Year</label>
          <input
            type="number"
            value={form.year}
            onChange={e => set('year', e.target.value)}
            placeholder="2024"
            className={errors.year ? 'err' : ''}
          />
          {errors.year && <p className="error-msg">{errors.year}</p>}
        </div>
      </div>

      <div className="book-form__row">
        <label className="label">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Brief description..."
        />
      </div>

      <div className="book-form__actions">
        <button className="btn-ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" />
              Saving...
            </>
          ) : (
            initial ? 'Update' : 'Add'
          )}
        </button>
      </div>
    </div>
  );
};

export default BookForm;