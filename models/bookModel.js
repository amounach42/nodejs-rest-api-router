import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc  Get all books
// @route GET /api/books
export async function findAll() {
  try {
    const books = await prisma.book.findMany();
    return books;
  } catch (error) {
    throw error;
  }
}

// @desc  Gets Single Book
// @route GET /api/books/:id
export async function findById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return book;
  } catch (error) {
    throw error;
  }
}

// @desc  POST Create a Book
// @route POST /api/books
export async function create(book) {
  try {
    const newBook = await prisma.book.create({
      data: {
        title: book["title"],
        author: book["author"],
        genre: book["genre"],
        publicationYear: book["publicationYear"],
        isbn: book["isbn"],
        pageCount: book["pageCount"],
        language: book["language"],
        path: book["path"],
      },
    });
    return newBook;
  } catch (error) {}
}

// @desc  PUT update a Book
// @route PUT /api/books/:id

export async function update(id, book) {
  try {
    const newBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title: book["title"],
        author: book["author"],
        genre: book["genre"],
        publicationYear: book["publicationYear"],
        isbn: book["isbn"],
        pageCount: book["pageCount"],
        language: book["language"],
        path: book["path"],
      },
    });
    return newBook;
  } catch (error) {
    throw error;
  }
}

// @desc DELETE delete a book
// @route DELETE api/books/:id
export async function deleteItem(id) {
  try {
      const deleteBook = await prisma.book.delete({
        where:{id: Number(id)}
      })
      return deleteBook;
  } catch (error) {

  }
}
