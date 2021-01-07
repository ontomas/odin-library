// Selectors
const bookContainer = document.querySelector(".js-book-container");
const form = document.querySelector(".js-form");
const modal = new bootstrap.Modal(document.getElementById("addModal"));

// State
let myLibrary = [];

if (localStorage.getItem("library")) {
  myLibrary = JSON.parse(localStorage.getItem("library"));
} else {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

// Helpers
function Book(title, author, pages, read) {
  this.id = Date.now();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addNewBook = () => {
  myLibrary.push(
    new Book(
      document.getElementById("title").value,
      document.getElementById("author").value,
      document.getElementById("pages").value,
      document.getElementById("status").checked
    )
  );
  localStorage.setItem("library", JSON.stringify(myLibrary));
};

const renderAllBooks = () => {
  bookContainer.innerHTML = "";
  return myLibrary.forEach((el) => {
    const book = document.createElement("div");
    book.classList.add("col-12", "col-sm-4", "mb-4");
    book.innerHTML = `
      <div class="card border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div class="d-flex flex-column">  
          <button type="button" class="btn-close align-self-end" aria-label="Close" data-uuid="${
            el.id
          }"></button>
          <h2 class="fs-4">"${el.title}"</h2>
          <p>By: ${el.author}</p>
          <p>Pages: ${el.pages}</p>
        </div>
        <button type="button" class="js-btn-change btn${
          el.read ? " btn-success" : " btn-secondary"
        }" data-uuid="${el.id}">${el.read ? "Read" : "To Read"}</button>
      </div>
    `;
    bookContainer.appendChild(book);
    localStorage.setItem("library", JSON.stringify(myLibrary));
  });
};

const successAddToast = new bootstrap.Toast(
  document.querySelector(".js-success-add-toast"),
  {
    animation: true,
    delay: 4000,
  }
);

const successRemoveToast = new bootstrap.Toast(
  document.querySelector(".js-success-remove-toast"),
  {
    animation: true,
    delay: 4000,
  }
);

renderAllBooks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewBook();
  modal.hide();
  successAddToast.show();
  renderAllBooks();
  form.reset();
});

bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    myLibrary = myLibrary.filter(
      (el) => !e.target.dataset.uuid.includes(el.id)
    );
    renderAllBooks();
    successRemoveToast.show();
  }
  if (e.target.classList.contains("js-btn-change")) {
    myLibrary.forEach((book) => {
      if (book.id === e.target.dataset.uuid) {
        book.read = !book.read;
      }
    });
    renderAllBooks();
  }
});
