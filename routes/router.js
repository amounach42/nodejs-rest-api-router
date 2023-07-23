const routes = new Map();

const router = {
  get(path, handler) {
    routes.set(`GET:${path}`, handler);
  },

  post(path, handler) {
    routes.set(`POST:${path}`, handler);
  },

  put(path, handler) {
    routes.set(`PUT:${path}`, handler);
  },

  del(path, handler) {
    routes.set(`DELETE:${path}`, handler);
  },

  handleRequest(req, res) {
    const { url, method } = req;
    console.log("Request URL:", url);
    console.log("Request Method:", method);

    routes.forEach((handler, route) => {
      console.log(`Route: ${route}, Handler: ${handler}`);
    });

    const handler = routes.get(`${method}:${url}`);
    console.log("Handler:", handler);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found', status: 404 }));
    }
  }
};

module.exports = router;
