const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/**
 * Register a new user
 */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

/**
 * Get all books (using Promise)
 */
public_users.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(books);
  })
    .then(data => res.status(200).json(data))
    .catch(() => res.status(500).json({ message: "Error retrieving books" }));
});

/**
 * Get book details by ISBN (using Promise)
 */
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject();
  })
    .then(book => res.status(200).json(book))
    .catch(() => res.status(404).json({ message: "Book not found" }));
});

/**
 * Get books by author (using async/await)
 */
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  const result = [];

  for (let key in books) {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  }

  res.status(200).json(result);
});

/**
 * Get books by title (using async/await)
 */
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  const result = [];

  for (let key in books) {
    if (books[key].title === title) {
      result.push(books[key]);
    }
  }

  res.status(200).json(result);
});

/**
 * Get book review by ISBN
 */
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
