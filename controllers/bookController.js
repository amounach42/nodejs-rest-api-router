import url from "url";
import { findAll, findById, create, update, deleteItem } from "../models/bookModel.js";
import { getBodyData} from "../utils.js"
import { Prisma } from "@prisma/client";

// @desc  Gets All Books
// @route GET /api/books
export async function getBooks(req, res) {
  try {
    const books = await findAll();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    throw error;
  }
}

// @desc  Get a specific Book
// @route GET /api/books/:id
export async function getBook(req, res ) {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.pathname.split("/")[3];
  try {
    const book = await findById(id);
    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log("Error", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

// @desc create a Book
// @route POSTE /api/books
export async function createBook(req, res) {
  const body = await getBodyData(req)
  const { title, author, genre, publicationYear, isbn, pageCount, language, path } = JSON.parse(body);
  try {
    const book = {
      title,
      author,
      genre,
      publicationYear,
      isbn,
      pageCount,
      language,
      path
    };
    const newBook = await create(book);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
}

// @desc update a Book
// @route PUT /api/books/:id

export  async function updateBook(req, res) {
  try {
    const id = req.url.split("/")[3];
    console.log("book ID: ", id);
    const oldBook = await findById(id);
    if (!oldBook) {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Book Not Found '}));
    }
    else {
      const body = await getBodyData(req);

      const { title, author, genre, publicationYear, isbn, pageCount, language, path } = JSON.parse(body);

      const book = {
        title: title || oldBook.title,
        author: author || oldBook.author,
        genre: genre || oldBook.genre,
        publicationYear: publicationYear || oldBook.publicationYear,
        isbn: isbn || oldBook.isbn,
        pageCount: pageCount || oldBook.pageCount,
        language: language || oldBook.language,
        path: path || oldBook.path
      };
      const newBook = await update(id, book);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newBook));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc delete a Book
// @route DELETE /api/books/:id

export async function deleteBook (req, res) {
  try {
    const id = req.url.split("/")[3];

    const book = await findById(id);
    if (!book) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end({ message: 'Book not found'});
    }
    else {
      const Book = await deleteItem(id);
      res.writeHead(202, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify(book));
    }
  } catch (error) {

  }
}
