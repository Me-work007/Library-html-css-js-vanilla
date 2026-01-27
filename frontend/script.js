console.log("hello world");
import books from "../books.js";

let allBooks = [...books]
let currentBooks = [...books]

const parent = document.querySelector(".main-section");
const categories = document.querySelectorAll(".category");
const searchBar = document.querySelector("#inpt")
searchBar.addEventListener('input', SearchFilter)


const renderer = (arr) => {
  if (!isPopup) {
    parent.innerHTML = arr
      .map(
        (book) => `
    <div class="card">
    <p class="title">${book.title}</p>
    <p class="Author">${book.author}</p>
    <p class="Genre">${book.genre}</p>
    <div class="buttons-book">
    <button class="save">Save</button>
    <button class="delete" data-id="${book.id}">Delete</button>
    </div>
    </div>
    `
      )
      .join("");
  } else {
    parent.innerHTML = ` 
    <div class="input-parent">
     <div id="popup">
  <form class="popup-box">
    <button type="button" class="close-btn">✕</button>

    <h2>Add Book</h2>

    <input type="text" placeholder="Book title" required />
    <input type="text" placeholder="Author" required />
    <input type="text" placeholder="Genre" required />

    <button type="submit" class="submit-btn">Add Book</button>
  </form>
</div>

    </div>`
  }
};

// adding the pop-up functionality
let isPopup = false

// Creating the add  renderer

const addBtn = document.querySelector("#add")
const closeBtn = document.querySelector(".close-btn")
const showInt = () => {
  console.log("clicked mofo", isPopup)
  isPopup = !isPopup
  renderer(currentBooks)
};

addBtn.addEventListener("click", showInt)
closeBtn.addEventListener("click", showInt)


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




