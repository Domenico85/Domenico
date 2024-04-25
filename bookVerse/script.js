function Book(title, author, pages, read, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'yes' ? true : false;
    this.cover = cover;
    this.info = function () {
        return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nRead: ${this.read}`;
    }
}

const formBook = document.querySelector('#form-book');
const bookContainer = document.querySelector('.book-container')
const myLibrary = [];


formBook.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]:checked').value.toLowerCase();
    const cover = document.querySelector('#cover').files[0];
    const newBook = new Book(title, author, pages, read, cover);


    myLibrary.push(newBook);
    console.log(myLibrary)

    const newBookBox = document.createElement('div');
    newBookBox.classList.add("book")
    newBookBox.innerHTML = `
    <p><strong>Title:</strong> ${newBook.title}</p>    
    <p><strong>Author:</strong> ${newBook.author}</p>
    <p><strong>Pages:</strong> ${newBook.pages}</p>
    `;

    if (newBook.cover) {
        // Display cover image if available
        newBookBox.innerHTML += `<img src="${URL.createObjectURL(newBook.cover)}" alt="Book Cover" class="book-cover">`;
    }
    
    // Optional: Add a placeholder image if no cover is provided
    else {
        newBookBox.innerHTML += `<img src="img/textimg.jpg" alt="Placeholder" class="book-cover">`;
    }

    bookContainer.appendChild(newBookBox);
    const button = document.createElement('button')
    button.innerText = "Read: " + (newBook.read ? 'Yes' : 'No');
    button.classList.add(newBook.read ? 'read-yes' : 'read-no');
    button.addEventListener('click', (event) => {
        newBook.read = !newBook.read
        event.target.innerText = "Read: " + (newBook.read ? 'Yes' : 'No');
        event.target.classList.toggle('read-yes', newBook.read);
        event.target.classList.toggle('read-no', !newBook.read);
    })
    const imageElement = newBookBox.querySelector('.book-cover');
    imageElement.style.maxWidth = '200px';
    imageElement.style.margin = '0 auto';
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

function showMenu() {
    let myLinks = document.querySelector("nav");
    myLinks.classList.toggle("activemenu");
}
document.querySelector(".logo");
let logo = document.querySelector(".logo");
logo.addEventListener("click", showMenu);