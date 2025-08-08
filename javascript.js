const log = console.log;

const myLibrary = [];

Book.prototype.toggleReadStatus = function() {
  this.readStatus = !this.readStatus;
}

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
};

function addBookToLibrary(book) {
  myLibrary.push(book)
};

function removeBookToLibrary(index) {
  myLibrary.splice(index, 1)
};

const library = document.querySelector('#library');
library.innerHTML = ""

let book1 = new Book('Book1', 'author1', '324');
let book2 = new Book('Book2', 'author2', '499');
addBookToLibrary(book1);
addBookToLibrary(book2);


const dialog = document.querySelector('dialog');
const bookForm = document.querySelector('#bookForm');
const closeDialog = document.querySelector('dialog > form > #close')
const addBook = document.querySelector("#addBook");
addBook.onclick = () => {
  dialog.showModal();

  bookForm.onsubmit = (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('#readStatus').checked;

    if (title != '' && author != '' && pages != 0) {
      const book = new Book(title, author, pages, readStatus);
      addBookToLibrary(book);
      bookForm.reset();
      dialog.close();
      renderLibrary();
    } else {
      alert('All fields required.')
    }
  }
}

closeDialog.onclick = () => {
  dialog.close();
}

function renderLibrary() {
  const library = document.querySelector('#library');
  library.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const newBook = document.createElement('div');
    newBook.setAttribute('id', 'bookDiv');

    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');

    title.textContent = "Title: " + book.title;
    author.textContent = "Author: " + book.author;
    pages.textContent = "Pages: " + book.pages;

    const bookReadToggle = document.createElement('button');
    // show correct label depending on status
    bookReadToggle.textContent = book.readStatus ? 'Mark as unread' : 'Mark as read';

    const bookRemoveToggle = document.createElement('button');
    bookRemoveToggle.textContent = 'Remove';

    bookReadToggle.onclick = () => {
      book.toggleReadStatus();
      renderLibrary();
    };
    
    bookRemoveToggle.onclick = () => {
      myLibrary.splice(index, 1);
      renderLibrary();
    };

    newBook.append(title, author, pages, bookReadToggle, bookRemoveToggle);
    library.append(newBook);
  })
  
  if (myLibrary.length === 0){
    const emptyMessage = document.createElement('h1');
    emptyMessage.textContent = 'No books saved. Add some and it will be displayed here.';
    library.append(emptyMessage);
  };
}

renderLibrary();