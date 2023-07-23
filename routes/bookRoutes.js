const routes = new Map();

const get = (path, handler) => {
  routes.set(`${path}/GET`, handler);
};

const post = (path, handler) => {
  routes.set(`${path}/POST`, handler);
};

const put = (path, handler) => {
  routes.set(`${path}/PUT`, handler);
};

const del = (path, handler) => {
  routes.set(`${path}/DELETE`, handler);
};

module.exports = {
  get,
  post,
  put,
  del
};

