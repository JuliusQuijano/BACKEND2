import e from 'express';
import * as bookModel from '../models/bookModel.js';
import ValidationError from '../utils/ValidationError.js';

export const fetchAllBooks = async() =>{
    const books = await bookModel.fetchAllBooks();
    return books;
}
const doesBookExist = async (book) =>{
    let existing;
    if(Object.hasOwn(book, 'id')){
        existing = await bookModel.findBookById(book.id);
    }else{
        existing = await bookModel.findBookByNameAndAuthor(book);
    }

    if (existing.length > 0) {
        return true;
    
    }

    return false;
}  




export const createBook = async (book) => {
    if (!book.name || !book.author) {
        throw new ValidationError("Name and author is required! ", 404 );
    }
    
    const existing = await doesBookExist(book);
    if (!existing) {
        throw new ValidationError("Book already exists", 404);
    }

    const bookId = await bookModel.insert(book);
    return bookId;
}

export const updateBook = async (book) => {
    if (!book.name || !book.author) {
        throw new ValidationError("Name and author is required! ", 404);
    }

    const existing = await doesBookExist(book);
    if (!existing) {
        throw new ValidationError("Book already exists", 404);
    }
}
//delete
export const deleteBook = async (id) => {
    const deletedBook = await bookModel.remove(parseInt(id));
    return deletedBook;
}