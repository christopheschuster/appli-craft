// sophisticated_code.js

/*
 * This code is a sophisticated implementation of a
 * library management system. It allows users to add,
 * delete, and search for books in a library. The books
 * are stored in an array, and various operations can
 * be performed on this array using different functions.
 * The code also includes error handling and input validation.
 */

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

let library = [];

function addBook(title, author, year) {
  const book = new Book(title, author, year);
  library.push(book);
  console.log(`${book.title} added to the library.`);
}

function deleteBook(title) {
  const index = library.findIndex(book => book.title === title);
  if (index === -1) {
    console.log(`Book "${title}" not found in library.`);
    return;
  }
  const deletedBook = library.splice(index, 1)[0];
  console.log(`${deletedBook.title} deleted from the library.`);
}

function searchBooks(query) {
  const matchedBooks = library.filter(book =>
    book.title.includes(query) || book.author.includes(query)
  );
  if (matchedBooks.length === 0) {
    console.log(`No books found matching "${query}".`);
    return;
  }
  console.log(`Books matching "${query}":`);
  for (const book of matchedBooks) {
    console.log(`- ${book.title} by ${book.author} (${book.year})`);
  }
}

console.log("Welcome to the library management system!");

while (true) {
  console.log("\nPlease select an option:");
  console.log("1. Add a book");
  console.log("2. Delete a book");
  console.log("3. Search for books");
  console.log("4. Exit");

  const option = prompt("Enter option number:");

  switch (option) {
    case "1":
      const title = prompt("Enter book title:");
      const author = prompt("Enter book author:");
      const year = parseInt(prompt("Enter publication year:"));
      addBook(title, author, year);
      break;
    case "2":
      const deleteTitle = prompt("Enter title of book to delete:");
      deleteBook(deleteTitle);
      break;
    case "3":
      const searchQuery = prompt("Enter search query:");
      searchBooks(searchQuery);
      break;
    case "4":
      console.log("Exiting library management system.");
      return;
    default:
      console.log("Invalid option. Please try again.");
  }
}