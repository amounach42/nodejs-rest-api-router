const http = require('http');
const fs = require('fs');
const books = require('./data/data');
const { getBooks } = require('./controllers/bookController.js');
const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
	if (req.url === '/api/books' && req.method === 'GET'){
		getBooks(req, res)
	}
	else{
		res.writeHead(404, { 'Content-type': 'application/json'});
		res.end(JSON.stringify({message: 'Error: Route not found'}));
	}
	});


server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
