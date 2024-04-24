function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'yes' ? true : false;
    this.info = function () {
        return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nRead: ${this.read}`;
    }
}

const formBook = document.querySelector('#form-book');
const bookContainer = document.querySelector('.book-container')

formBook.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]:checked').value;
    console.log(read);
    const newBook = new Book(title, author, pages, read);

    const myLibrary = [];

    myLibrary.push(newBook);
    console.log(myLibrary)

    const newBookBox = document.createElement('div');
    newBookBox.classList.add("book")
    newBookBox.innerHTML = `
    <p><strong>Title:</strong> ${newBook.title}</p>    
    <p><strong>Author:</strong> ${newBook.author}</p>
    <p><strong>Pages:</strong> ${newBook.pages}</p>
    `;

    bookContainer.appendChild(newBookBox);
    const button = document.createElement('button')
    button.innerText = "Read: " + (newBook.read ? 'Yes' : 'No');
    button.classList.add(newBook.read ? 'read-yes' : 'read-no');
    button.addEventListener('click', (event) => {
        newBook.read = !newBook.read
        event.target.innerText = "Read: " + (newBook.read ? 'Yes' : 'No');
        event.target.classList.toggle('read-yes');
        event.target.classList.toggle('read-no');
    })

    const removeButton = document.createElement('button');
    removeButton.innerText = "Remove Book";
    removeButton.classList.add('remove-button');

    removeButton.dataset.bookIndex = myLibrary.length - 1;

    removeButton.addEventListener('click', (event) => {
        const bookIndexToRemove = parseInt(event.target.dataset.bookIndex);
        if (!isNaN(bookIndexToRemove)) {
            myLibrary.splice(bookIndexToRemove, 1);
            bookContainer.removeChild(event.target.parentNode);
        }
    });
    newBookBox.appendChild(button);
    newBookBox.appendChild(removeButton);
    formBook.reset();
});