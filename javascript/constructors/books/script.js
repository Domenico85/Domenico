function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nRead: ${this.read}`;
    }
}

const book1 = new Book('The Hobbit', "J.R.R. Tolkien", 295 ,'not read yet' )

console.log (book1.info());