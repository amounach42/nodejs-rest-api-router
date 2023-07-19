const { resolve } = require('path');
const books = require('../data/data');


function findAll() {
	return new Promise((resolve, reject) => {
		resolve(books);
	})
}

//@desc  Gets Single Product
// @route GET /api/products/:id
function findById(id) {
	return new Promise((resolve, reject) => {
		const book = books.find((b) => b.id  == id)
		console.log("ID: ", id);
		console.log("Book: ", book);
		resolve(book)
	})
}
module.exports = {
	findAll,
	findById
}
