const http = require('http');
const fs = require('fs');
const books = require('./data/data');
const { getBooks, getBook } = require('./controllers/bookController.js');
const { url } = require('inspector');
const hostname = '127.0.0.1';
const port = 3000;
const router = require('./routes/bookRoutes.js');

const server = http.createServer((req, res) => {

	req.url
	const {
		url,
		method
	} = req

	console.log({ url, method });
	// router.forward(req, res);

	if (req.url === '/api/books' && req.method === 'GET'){
		getBooks(req, res)
	} else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3]
		getBook(req, res, id)
	  } else if (res.url === '/api/books' && req.method === 'POST') {
		createBook(req, res, id)
	  } else {
		res.writeHead(404, { 'Content-type': 'application/json'});
		res.end(JSON.stringify({message: 'Error: Route not found'}));
	}
	});

server.listen(port,() => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
