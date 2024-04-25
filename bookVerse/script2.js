function Book(title, author, pages, read, coverFile) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'yes' ? true : false;
    this.coverFile = coverFile;
    this.info = function () {
        return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nRead: ${this.read}`;
    }
}

const formBook = document.querySelector('#form-book');
const bookContainer = document.querySelector('.book-container')
const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
const myLibrary = storedLibrary || [];

function saveLibrary() {
    const serializedLibrary = myLibrary.map(book => {
        const { coverFile, ...rest } = book;
        return rest;
    });
    localStorage.setItem('myLibrary', JSON.stringify(serializedLibrary));
}

function createBookBox(book) {
    const newBookBox = document.createElement('div');
    newBookBox.classList.add("book");
    newBookBox.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>    
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
    `;

    if (book.coverFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgSrc = event.target.result;
            newBookBox.innerHTML += `<img src="${imgSrc}" alt="Book Cover" class="book-cover">`;
        };
        reader.readAsDataURL(book.coverFile);
    } else {
        newBookBox.innerHTML += `<img src="img/textimg.jpg" alt="Placeholder" class="book-cover">`;
    }

    const button = document.createElement('button');
    button.innerText = "Read: " + (book.read ? 'Yes' : 'No');
    button.classList.add(book.read ? 'read-yes' : 'read-no');
    button.addEventListener('click', (event) => {
        book.read = !book.read;
        event.target.innerText = "Read: " + (book.read ? 'Yes' : 'No');
        event.target.classList.toggle('read-yes', book.read);
        event.target.classList.toggle('read-no', !book.read);
        saveLibrary();
    });

    const removeButton = document.createElement('button');
    removeButton.innerText = "Remove Book";
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        const index = myLibrary.indexOf(book);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            bookContainer.removeChild(newBookBox);
            saveLibrary();
        }
    });

    newBookBox.appendChild(button);
    newBookBox.appendChild(removeButton);

    return newBookBox;
}

formBook.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]:checked').value.toLowerCase();
    const coverFile = document.querySelector('#cover').files[0];
    const newBook = new Book(title, author, pages, read, coverFile);

    myLibrary.push(newBook);
    saveLibrary();

    const newBookBox = createBookBox(newBook);
    bookContainer.appendChild(newBookBox);

    formBook.reset();
});

function loadLibrary() {
    const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (storedLibrary) {
        myLibrary.length = 0;
        storedLibrary.forEach(bookData => {
            const { title, author, pages, read } = bookData;
            const coverFile = null;
            const book = new Book(title, author, pages, read, coverFile);
            myLibrary.push(book);
            const newBookBox = createBookBox(book);
            bookContainer.appendChild(newBookBox);

        });
    }
}

window.addEventListener('load', loadLibrary);

function showMenu() {
    const myLinks = document.querySelector("nav");
    myLinks.classList.toggle("activemenu");
}

const logo = document.querySelector(".logo");
logo.addEventListener("click", showMenu);
