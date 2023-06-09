import express from "express";
const router = express.Router();

const books = [
    {
        isbn: 1,
        title: "Kein Bock",
        year: 2001,
        author: "Queen"
    },
    {
        isbn: 2,
        title: "Der Alchimist",
        year: 1988,
        author: "Paulo Coelho"
    },
    {
        isbn: 3,
        title: "Harry Potter und der Stein der Weisen",
        year: 1997,
        author: "J.K. Rowling"
    },
    {
        isbn: 4,
        title: "Die Verwandlung",
        year: 1915,
        author: "Franz Kafka"
    },
    {
        isbn: 5,
        title: "1984",
        year: 1949,
        author: "George Orwell"
    },
    {
        isbn: 6,
        title: "To Kill a Mockingbird",
        year: 1960,
        author: "Harper Lee"
    },
    {
        isbn: 7,
        title: "The Catcher in the Rye",
        year: 1951,
        author: "J.D. Salinger"
    },
    {
        isbn: 8,
        title: "The Great Gatsby",
        year: 1925,
        author: "F. Scott Fitzgerald"
    },
    {
        isbn: 9,
        title: "The Hobbit",
        year: 1937,
        author: "J.R.R. Tolkien"
    },
    {
        isbn: 10,
        title: "Pride and Prejudice",
        year: 1813,
        author: "Jane Austen"
    }
];

router.get('/', (request, response)=>{
    response.send(books);
})

router.get('/:isbn', (request, response) =>{
    const isbn = request.params.isbn
    let foundbook = null
    for (let book of books){
        if(book.isbn === Number(isbn)){
            foundbook = book;
            break;
        }
    }
    if (foundbook){
        response.send(foundbook)
    }else{
        response.send("Nicht gefunden 💀")
    }
})

router.post('/', (request, response)=>{
    let newBook = {};
    for(const key in request.body){
        newBook[key] = request.body[key];
    }
    books.push(newBook);
    response.send(newBook);
})

router.put('/:isbn', (request, response)=>{
    const isbn = request.params.isbn;
    let foundbook = null;
    let updatedbook = {}; //Bräuchte es eigentlich nicht, da foundbook auch upgedated werden kann, aber so ist es übersichtlicher
    for (let book of books){
        if (book.isbn === Number(isbn)){
            foundbook = book;
            break;
        }
    }
    if (foundbook){
        updatedbook = foundbook; //Nicht nötig, aber übersichtlicher
        for (const key in request.body){
            updatedbook[key] = request.body[key];
        }
        response.send(updatedbook);
    }
})

router.delete('/:isbn', (request, response)=>{
    const isbn = request.params.isbn;
    let foundbook = null;
    for (let book of books){
        if(book.isbn === Number(isbn)){
            foundbook = book;
            break;
        }
    }
    if (foundbook){
        const index = books.indexOf(foundbook);
        books.splice(index, 1);
        response.send(foundbook);
    }
})

export default router;