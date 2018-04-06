/**
 * @typedef Book
 * @property {string} title
 * @property {string} author
 * @property {Number} numberOfPages
 * @property {Date} publishDate
 */

/**
 * Book Object
 * @constructor 
 * @param {Book} args 
 */
var Book = function(args) {
  if (arguments.length === 1) {
    this.title = args.title;
    this.author = args.author;
    this.numberOfPages = args.numberOfPages;
    this.publishDate = new Date(args.publishDate);
  } 
  else {
    throw new Error("Invalid input");
  }
};

(function(){
/**
 * Library Object Constructor
 * @constructor
 */
var Library = function() {
  this.books = this._getStoredBooks();
};

Library.prototype._getStoredBooks = function() {
  var results = [];
  var storedBooks = localStorage.getItem("books");
  var books = storedBooks !== null ? JSON.parse(storedBooks) : [];

  for (var index = 0; index < books.length; index++) {
    results.push(new Book(books[index]));
  }
  return results;
};

Library.prototype._storeBooks = function(){
    var strings = JSON.stringify(this.books);
    localStorage.setItem('books',strings );
}

/**
 * Add book to library
 * @param {Book} book
 * @returns {bool}
 */
Library.prototype.addBook = function(book) {
  for (var index = 0; index < this.books.length; index++) {
    if (this.books[index].title === book.title) {
      return false;
    }
  }
  this.books.push(book);
  this._storeBooks();
  return true;
};

/**
 * Removes a book or books from library based on title
 * @param {string} title
 * @returns {bool} true if a book was removed false otherwise
 */
Library.prototype.removeBookByTitle = function(title) {
  var removed = false;
  for (var index = 0; index < this.books.length; index++) {
    if (this.books[index].title === title) {
      this.books.splice(index, 1);
      removed = true;
    }
  }
  this._storeBooks();
  return removed;
};

/**
 * Removes a book or books from library based on author's name
 * @param {string} authorName
 * @returns {bool}
 */
Library.prototype.removeBookByAuthor = function(authorName) {
  var filteredBooks = [];
  for (var index = 0; index < this.books.length; index++) {
    var currentBook = this.books[index];
    if (currentBook.author !== authorName) {
      filteredBooks.push(currentBook);
    }
  }
  var removed = this.books.length !== filteredBooks.length;
  if (removed) {
    this.books = filteredBooks;
    this._storeBooks();
  }
  return removed;
};

/**
 *Return a random book from library
 * @returns {Book}
 */
Library.prototype.getRandomBook = function() {
  if (this.books.length === 0) {
    return null;
  }
  return this.books[Math.floor(Math.random() * this.books.length)];
};

/**
 * Return all books that match title
 * @param {string} title 
 * @returns {Book[]} array of books
 */
Library.prototype.getBookByTitle = function(title) {
    var results = [];
    var tester = new RegExp(title,'i');
    for (var index = 0; index < this.books.length; index++) {
        var currentBook = this.books[index]
        if (tester.test(currentBook.title)) {
            results.push(currentBook);
        }
    }
    return results;
};

/**
 *Return all books that match authorName
 * @param {string} authorName
 * @returns {Book[]} array of books
 */
Library.prototype.getBooksByAuthor = function(authorName) {
  var results = [];
  var tester = new RegExp(authorName,'i');
  for (var index = 0; index < this.books.length; index++) {
      var currentBook = this.books[index]
      if (tester.test(currentBook.author)) {
          results.push(currentBook);
      }
  }
  return results;
};

/**
 * Add array of books to the library
 * @param {Book[]} inBooks
 * @returns {Number} count of books added
 */
Library.prototype.addBooks = function(inBooks) {
  var count = 0;
  for (var index = 0; index < inBooks.length; index++) {
    if (this.addBook(inBooks[index])) {
      count++;
    }
  }
  return count;
};

/**
 * Return all authors that have books in Library
 * @returns {string[]} authors[]
 */
Library.prototype.getAuthors = function() {
  var results = [];
  for (var index = 0; index < this.books.length; index++) {
    var author = this.books[index].author;
    if (results.indexOf(author) === -1) {
      results.push(author);
    }
  }
  return results;
};

/**
 * Return random authors by name
 * @returns {string} a single randomly selected author
 */
Library.prototype.getRandomAuthorName = function() {
  if (this.books.length === 0) {
    return null;
  }
  var authors = this.getAuthors();
  return authors[Math.floor(Math.random() * authors.length)];
};

Library.prototype.search = function(searchObj){
    var props = Object.getOwnPropertyNames(searchObj);
    var regExs = []
    var results = [];

    for (var index = 0; index < props.length; index++) {
        regExs.push(new RegExp(searchObj[props[index]].toString(),'i'));
    }

    for (var index2 = 0; index2 < this.books.length; index2++) {
        var add = true;
        var currentBook = this.books[index2];
        for (var index3 = 0; index3 < regExs.length; index3++) {
            var propName = props[index3];
            if (!regExs[index3].test(currentBook[propName].toString())) {
                add = false;                
            }
        }
        if (add) {
            results.push(currentBook);
        }
    }
    return results;
}

window.$lib = new Library();
})();
