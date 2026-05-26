# BookShelf – Book Management System

A React-based Book Management System with full CRUD operations, search, filtering, and MockAPI.io integration.

## Features

- **View** all books with title, author, genre, year, and description
- **Add** new books via a validated modal form
- **Edit** existing books with pre-filled form
- **Delete** books with confirmation dialog
- **Search** by title, author, or genre (real-time)
- **Filter** by genre using a dropdown
- **Loading states** on all async operations
- **Error handling** with toast notifications and retry option
- **Mock API** via MockAPI.io (real REST endpoints)

## Project Structure

```
src/
├── api/
│   └── books.js          # All API calls (GET, POST, PUT, DELETE)
├── components/
│   ├── BookCard.jsx       # Individual book card with edit/delete
│   ├── BookForm.jsx       # Reusable add/edit form with validation
│   ├── DeleteConfirm.jsx  # Delete confirmation modal
│   ├── GenreBadge.jsx     # Colored genre tag
│   └── Toast.jsx          # Success/error notification
├── styles/
│   └── global.css         # All global styles and CSS variables
├── App.js                 # Main component — state, routing, layout
└── index.js               # React entry point
```

## Setup Instructions

## 1. Clone & Install

```bash
cd book-management
npm install
```

## 2. Run Locally

```bash
npm start
```

App opens at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

## Tech Stack

- React 18
- CSS Variables (no extra CSS library)
- MockAPI.io (hosted mock REST API)
- Deployed on Vercel
