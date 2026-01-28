console.log("hello world");
import books from "../books.js";

let allBooks = [...books]
let currentBooks = [...books]
let currentFilter = 'All';

const parent = document.querySelector(".main-section");
const categories = document.querySelectorAll(".category");
const searchBar = document.querySelector("#inpt")
const addBtn = document.querySelector("#add");
const overlay = document.querySelector("#overlay-root");
const closeBtn = document.querySelector(".close-btn");
const bookForm = document.querySelector("#book-form");
const submitBtn = document.querySelector(".submit-btn")
searchBar.addEventListener('input', SearchFilter)


const renderer = (arr) => {
  parent.innerHTML = arr
    .map(
      (book) => `
                <div class="card">
                    <p class="title">${book.title}</p>
                    <p class="Author">${book.author}</p>
                    <p class="Genre">${book.genre}</p>
                    <div class="buttons-book">
                        <button class="delete" data-id="${book.id}">Delete</button>
                    </div>
                </div>
            `
    )
    .join("");
};

// Creating the add  renderer
// Show popup
const showPopup = () => {
  overlay.classList.add('active');
};

// Hide popup
const hidePopup = () => {
  overlay.classList.remove('active');
  bookForm.reset();
};

// Add book button
addBtn.addEventListener("click", showPopup);

// Close button
closeBtn.addEventListener("click", hidePopup);

// Click outside popup to close
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    hidePopup();
  }
});

// creating a new book constructor and also pushing new books.

function BookCreator(title, author, genre){
  if(!new.target){
    throw Error("You cannot use this constructor without new keyword")
  }
  this.title = title
  this.author = author
  this.genre = genre
}

function addToLibrary(e) {
  e.preventDefault();
  
  let book_title = document.querySelector("#book-title").value;
  let book_author = document.querySelector("#book-author").value;
  let book_genre = document.querySelector("#genre").value;
  
  const newBook = new BookCreator(book_title, book_author, book_genre);
  newBook.id = Date.now().toString();
  
  allBooks.push(newBook);
  currentBooks = filter_cat(allBooks, currentFilter);  // 👈 Reapply the current filter!
  renderer(currentBooks);
  hidePopup();
}

submitBtn.addEventListener("click", addToLibrary)



const deleteOne = (id) => {
  allBooks = allBooks.filter(book => book.id !== id);
  currentBooks = [...allBooks]
  renderer(currentBooks)
};

parent.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) return;

  deleteOne(e.target.dataset.id);
});



const filter_cat = (arr, genre) => {
  if (genre === "All") {
    return arr;
  }

  return arr.filter((book) => book.genre === genre);
};

function callOnCate(e) {
  const genre = e.currentTarget.textContent.trim();
  currentFilter = genre;  // 👈 Save the current filter
  currentBooks = filter_cat(allBooks, genre);
  renderer(currentBooks);
}
renderer(currentBooks);

categories.forEach((btn) => {
  btn.addEventListener("click", callOnCate);
});


function SearchFilter(e) {
  const query = e.target.value.trim().toLowerCase();
  if (query === "") {
    renderer(currentBooks);
    return;
  }

  const search_filtered_arr = currentBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  });

  renderer(search_filtered_arr);
}




