import http from "http";
import { sendNotFound, sendServerError } from "./responseUtils/httpResponses.js";
import { getBooks, getBook, createBook, updateBook, deleteBook } from "./controllers/bookController.js";
import { match, parseEndpoint } from "./parser/urlParser.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

class Certify extends http.Server {
  initialRouter = [];

  constructor() {
    super((req, res) => {
      this.request(req, res);
    });
  }

  handleRequest(req, res) {
    const { url, method } = req;

    for (const router of this.initialRouter) {
      if (match(url, router.patterns) && method === router.method) {
        router.callback(req, res)
        return
      }
    }
    sendNotFound(res);
  }
  request(req, res) {
    this.handleRequest(req, res);
  }

  add(method, path, callback) {
    this.initialRouter.push(
      {
        method, callback,
        patterns: parseEndpoint(path),
      }
    )
  }

  get(path, callback) {
    this.add("GET", path, callback);
  }
  post(path, callback) {
    this.add("POST", path, callback);
  }
  put(path, callback) {
    this.add("PUT", path, callback);
  }
  delete(path, callback) {
    this.add("DELETE", path, callback);
  }
}

const app = new Certify();

app.get("/api/books/:id", getBook);
app.get("/api/books", getBooks);
app.post("/api/books", createBook);
app.put("/api/books/:id", updateBook);
app.delete("/api/books/:id", deleteBook);

app.listen(3001);
