import * as bookModel from '../models/bookModel.js';

export const fetchAllBooks = async() =>{
    const books = await bookModel.fetchAllBooks();
    return books;
}

export const createBook = async (book) => {
    const bookId = await bookModel.insert(book);
    return bookId;
}

//UPDATE BOOK
export const updateBook = async (book) => {
    const updatedbook = await bookModel.update(book);
    return updatedbook;
}   

//DELETE BOOK new
export const deleteBook = async (id) => {
    const deletedbook = await bookModel.deleteBook(id);
    return deletedbook;
}
