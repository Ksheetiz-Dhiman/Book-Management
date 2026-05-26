const BASE_URL = "https://6a15834791ff9a63de08469b.mockapi.io/v1";

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

export const getBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  return handleResponse(res);
};

export const addBook = async (book) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return handleResponse(res);
};

export const updateBook = async (book) => {
  const res = await fetch(`${BASE_URL}/books/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return handleResponse(res);
};

export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return id;
};
