const url = require('url');
const books = require('../data/data');
const Book  = require('../models/bookModel');
//@desc  Gets All Products
// @route GET /api/products
async function getBooks(req, res)   {
	try {
		const books = await Book.findAll()
		res.writeHead(200, { 'content-type': 'application/json'});
		res.end(JSON.stringify(books));
	} catch (error) {
			console.log(error);
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

	} catch (error) {
			console.log(error);
	}
}

module.exports = {
	getBooks,
	getBook
}
