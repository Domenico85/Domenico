function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nRead: ${this.read}`;
    }
}

const formBook = document.querySelector('#form-book');

formBook.addEventListener('submit', function (event){
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]:checked').value;
    console.log(read);
    const newBook = new Book(title,author,pages,read);

    const myLibrary = [];

    myLibrary.push(newBook);
    console.log(myLibrary)

    formBook.reset();
});