const books = require('../data/data');

function findAll() {
	return new Promise((resolve, reject) => {
		resolve(books);
	})
}

module.exports = {
	findAll
}
