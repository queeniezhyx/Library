// Simple array to hold our books
const myLibrary = [];

// Book "class"
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Add a new book to the array
function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
}

// Remove book by index
function removeBook(index) {
  myLibrary.splice(index, 1);
  renderLibrary();
}

// Toggle read status
function toggleReadStatus(index) {
  const book = myLibrary[index];
  if (!book) return;
  book.isRead = !book.isRead;
  renderLibrary();
}

// Re-render all book cards
function renderLibrary() {
  const grid = document.getElementById("books-grid");
  grid.textContent = ""; // Clear existing content

  if (myLibrary.length === 0) {
    grid.innerHTML = "<p>You don't have any books yet. Add one above!</p>";
    return;
  }

  myLibrary.forEach((book, index) => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    const main = document.createElement("div");
    main.classList.add("book-main");

    const title = document.createElement("h3");
    title.classList.add("book-title");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.classList.add("book-author");
    author.textContent = `by ${book.author}`;

    const meta = document.createElement("p");
    meta.classList.add("book-meta");
    meta.textContent = `${book.pages} pages`;

    main.appendChild(title);
    main.appendChild(author);
    main.appendChild(meta);

    const footer = document.createElement("div");
    footer.classList.add("book-footer");

    const badge = document.createElement("span");
    badge.classList.add("badge");
    if (book.isRead) {
      badge.classList.add("read");
      badge.textContent = "Read";
    } else {
      badge.classList.add("not-read");
      badge.textContent = "Not read yet";
    }

    const buttonsWrapper = document.createElement("div");

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("btn", "secondary");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.addEventListener("click", () => toggleReadStatus(index));

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "danger");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeBook(index));

    buttonsWrapper.appendChild(toggleBtn);
    buttonsWrapper.appendChild(removeBtn);

    footer.appendChild(badge);
    footer.appendChild(buttonsWrapper);

    card.appendChild(main);
    card.appendChild(footer);

    grid.appendChild(card);
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const isReadInput = document.getElementById("isRead");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);
  const isRead = isReadInput.checked;

  // Simple validation
  if (!title || !author || !pages) {
    alert("Please fill in all fields.");
    return;
  }

  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);

  // Reset form
ent.target.reset();
}

// Initial setup
function init() {
  const form = document.getElementById("book-form");
  form.addEventListener("submit", handleFormSubmit);


  const sample1 = new Book("Dune", "Frank Herbert", 3304, true);
  const sample2 = new Book("Omniscient Reader's Viewpoint", "sing N song", 4708900, false);
  myLibrary.push(sample1, sample2);
  renderLibrary();
}

document.addEventListener("DOMContentLoaded", init);
