/* eslint-disable no-unused-vars */
//1.If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
//2.All of your book objects are going to be stored in a simple array,
//so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array.
//Your code should look something like this:
//3.Write a function that loops through the array and displays each book on the page.
//You can display them in some sort of table, or each on their own “card”.
//It might help for now to manually add a few books to your array so you can see the display.
//Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book:
//author, title, number of pages, whether it’s been read and anything else you might want.
//You will most likely encounter an issue where submitting your form will not do what you expect it to do.
//That’s because the submit input tries to send the data to a server by default.
//If you’ve done the bonus section for the calculator assignment, you might be familiar with event.preventDefault();
//Read up on the event.preventDefault documentation again and see how you can solve this issue!
let myLibrary = [];


const booksDisplayWrapper = document.querySelector(".books-display");
const form = document.querySelector("form");



function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = Boolean(read);
  
}

Book.prototype.toggle = function () {
  this.read = !this.read;
}

function addBookToLibrary() {  
const authorInput = document.getElementById("book-author").value;
const titleInput = document.getElementById("book-title").value;
const pagesInput = document.getElementById("book-pages").value;
const checkBoxInput = document.getElementById("checkbox").checked;
const newBook = new Book(authorInput, titleInput, pagesInput, checkBoxInput);

  myLibrary.push(newBook);
  DisplayBooks();
  console.log(myLibrary);
}

function UpdateDisplayBooks() {
  booksDisplayWrapper.innerHTML = "";
  myLibrary.forEach((book, i) => {
    let readDisplay = "";
    let classBackgroundColor = "";
    
    if(!book.read){
      readDisplay = "Not read"
      classBackgroundColor = "not-read-display read"
    } else {
      readDisplay = "Read"
      classBackgroundColor = "read-display read"
    }
    const bookCard = `<div class="book-card" data-index = ${i}>
    <h3 class="author-display">${book.author}</h3>
    <p class="title-display">${book.title}</p>
    <p class="pages-display">${book.pages} Pages</p>
    <button class="${classBackgroundColor}">${readDisplay}</button>
    <div class="remove">
    <i onclick="removeBook()" class="bi bi-trash"></i>
    </div>
  </div>`
  
  const element = document.createElement('div');
  element.innerHTML = bookCard;
  booksDisplayWrapper.appendChild(element);
  
  })
  
  
}

function DisplayBooks() {
  UpdateDisplayBooks();  
  removeBook();
  ToggleButton();

}

function removeBook() {
  const deleteButtons = document.querySelectorAll(".bi.bi-trash");
  for(let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', () => {
      myLibrary.splice(i, 1);
      DisplayBooks();
    })
  }

}

function ToggleButton() {
  const readButtons = document.querySelectorAll(".read");
  for(let i = 0; i < readButtons.length; i++){
    readButtons[i].addEventListener('click', () => {
      myLibrary[i].toggle();
      DisplayBooks();
    })
  }

}



function openForm() {
  document.getElementById("popupForm").style.display = "block";
  document.querySelector(".pop-up-screen-change").style.backgroundColor = "#0000007d";
  document.querySelector(".pop-up-screen-change").style.height = "100vh";
  document.querySelector(".pop-up-screen-change").style.display = "block";
  document.querySelector(".pop-up-screen-change").style.position = "fixed";
  document.querySelector(".pop-up-screen-change").style.top = "0px";
  document.querySelector(".pop-up-screen-change").style.left = "0";
  document.querySelector(".pop-up-screen-change").style.bottom = "0";
  document.querySelector(".pop-up-screen-change").style.right = "0";
 document.getElementById("popupForm").style.animation = 'appear 500ms ease-out forwards';
 document.body.classList.add("noscroll");


}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.querySelector(".pop-up-screen-change").style.display = "none";
  document.body.classList.remove("noscroll");
  form.reset();
}
function FormSubmit() {
  
  form.addEventListener('submit', (e) => {
  e.preventDefault();
  closeForm();
  form.reset();
})
}
FormSubmit();



