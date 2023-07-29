const url = require('url');
const books = require('../data/data');
const Book  = require('../models/bookModel');


// @desc  Gets All Books
// @route GET /api/books
async function getBooks(req, res)   {

	try {
	  const books = await Book.findAll();
	  res.writeHead(200, { 'content-type': 'application/json' });
	  res.end(JSON.stringify(books));
	} catch (error) {
	  console.log(error);
	}

  }
}

//@desc  Gets Single Product
// @route GET /api/product/:id
async function getBook(req, res) {
	let parseUrl = url.parse(req.url, true);
	const id = parseUrl.pathname.split('/')[3];
	try {
		const book = await Book.findById(id)

		if (!book) {
			res.writeHead(404, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ message: 'Book Not Found' }));
		} else {
			res.writeHead(200, { 'content-type': 'application/json'});
			res.end(JSON.stringify(book));
		}

// @desc  Get a specific Book
// @route GET /api/books/:id
async function getBook(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.pathname.split('/')[3];
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Book Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log("Error", error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
}

//@desc create a Book
// @route POSTE /api/books
async function createBook(req, res) {
  try {
    const book = {
      title: '42 network',
      author: 'Larbi El Hilali',
      genre: 'Fantasy',
      publicationYear: 2013,
      isbn: '974555764488',
      pageCount: 1337,
      language: 'English'
    }
    const newBook = await Book.create(book);
    res.writeHead(201, { 'Content-Type': 'application/json'});
    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
}
  module.exports = {
	getBooks,
	getBook,
	createBook
  };
