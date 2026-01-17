const express = require('express');
const axios = require('axios');
const public_users = express.Router();

/**
 * Get all books
 */
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get book details by ISBN
 */
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/books/${req.params.isbn}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * Get books by author
 */
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    const books = Object.values(response.data).filter(
      book => book.author === req.params.author
    );

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author" });
  }
});

/**
 * Get books by title
 */
public_users.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    const books = Object.values(response.data).filter(
      book => book.title === req.params.title
    );

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports.general = public_users;
