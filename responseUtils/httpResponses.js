function sendNotFound(res) {
	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Error: Route not found' }));
  }

  function sendServerError(res) {
	res.writeHead(500, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }

  module.exports = {
	sendNotFound,
	sendServerError,
  };
