export class Book {
  constructor(args) {
    if (arguments.length === 1) {
      this.title = args.title;
      this.author = args.author;
      this.numberOfPages = args.numberOfPages;
      this.publishDate = new Date(args.publishDate);
      if (args.key && args.cover === 'img/book.svg') {
        this.getCover(args.key);
      }
      this.cover = args.cover ? args.cover : "img/book.svg";
    }
    else {
      throw new Error("Invalid input");
    }
  }
  isEquals(book) {
    return (this.title === book.title &&
      this.author === book.author &&
      this.numberOfPages === book.numberOfPages &&
      this.publishDate.getDate() === book.publishDate.getDate());
  }
  getCover(key) {
    let book = this;
    let uri = "https://www.googleapis.com/books/v1/volumes?key=" + key + "&q=title:%22" + encodeURI(this.title) + "%22+author:%22" + encodeURI(this.author) + "%22";
    jQuery.getJSON(uri, function (data) {
      if (data.items) {
        if (data.items.length > 0) {
          let self = data.items[0].selfLink + "?&key=" + key;
          jQuery.getJSON(self, function (data) {
            if (data.volumeInfo && data.volumeInfo.imageLinks) {
              let imageLinks = data.volumeInfo.imageLinks;
              let keys = Object.keys(imageLinks);
              if (keys.length > 0) {
                let link = imageLinks.thumbnail ? imageLinks.thumbnail : imageLinks[keys[keys.length - 1]];
                book.cover = link.replace(/^http:\/\//i, 'https://');
              }
            }
          });
        }
      }
    });
  }
}


export var Library = (function() {

  var instance;
  var localStorageKey = "books";
  var store = true;

  class Library {
    constructor() {
      if (instance) {
        return instance;
      }
      this.books = [];
      this.apiKey = '';
    }
    addBook(book, ignoreUpdate) {
      for (var index = 0; index < this.books.length; index++) {
        if (book.isEquals(this.books[index])) {
          return false;
        }
      }
      this.books.push(book);
      if (!ignoreUpdate) {
        updateLibrary();
      }
      return true;
    }
    removeBookByTitle(title) {
      var removed = false;
      for (var index = 0; index < this.books.length; index++) {
        if (this.books[index].title === title) {
          this.books.splice(index, 1);
          removed = true;
        }
      }
      updateLibrary();
      return removed;
    }
    removeBooksByAuthor(authorName) {
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
        updateLibrary();
      }
      return removed;
    }
    getRandomBook() {
      if (this.books.length === 0) {
        return null;
      }
      return this.books[Math.floor(Math.random() * this.books.length)];
    }
    updateBook(title, newValues) {
      let found = false;
      for (let index = 0; index < this.books.length; index++) {
        var book = this.books[index];
        if (book.title === title) {
          found = true;
          break;
        }
      }
      if (found) {
        book.cover = newValues.cover;
        book.title = newValues.title;
        book.author = newValues.author;
        book.numberOfPages = newValues.numberOfPages;
        book.publishDate = newValues.publishDate;
        updateLibrary();
      }
    }
    getBookByTitle(title) {
      return this.search({ title: title });
    }
    getBooksByAuthor(authorName) {
      return this.search({ author: authorName });
    }
    addBooks(inBooks) {
      var count = 0;
      for (var index = 0; index < inBooks.length; index++) {
        if (this.addBook(inBooks[index], true)) {
          count++;
        }
      }
      updateLibrary();
      return count;
    }
    getAuthors() {
      var results = [];
      for (var index = 0; index < this.books.length; index++) {
        var author = this.books[index].author;
        if (results.indexOf(author) === -1) {
          results.push(author);
        }
      }
      return results;
    }
    getRandomAuthorName() {
      if (this.books.length === 0) {
        return null;
      }
      var authors = this.getAuthors();
      return authors[Math.floor(Math.random() * authors.length)];
    }
    search(searchObj) {
      var props = Object.getOwnPropertyNames(searchObj);
      var regExs = [];
      var results = [];
      for (var index = 0; index < props.length; index++) {
        regExs.push(new RegExp(searchObj[props[index]].toString(), "i"));
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
  }














  function getStoredBooks() {
    var results = [];
    var storedBooks = localStorage.getItem(localStorageKey);
    var books = storedBooks !== null ? JSON.parse(storedBooks) : [];

    for (var index = 0; index < books.length; index++) {
      books[index].key = instance.apiKey;
      results.push(new Book(books[index]));
    }
    return results;
  }

  function updateLibrary() {
    if (store) {
      var strings = JSON.stringify(instance.books);
      localStorage.setItem(localStorageKey, strings);
    }
  }

  function init(options) {
    if (!instance) {
      instance = new Library();

      var options = options ? options : {};

      if (typeof options.store !== "undefined") {
        store = options.store;
      }
  
      if (typeof options.localStorageKey === "string") {
        localStorageKey = options.localStorageKey;
      }

      if (typeof options.apiKey === "string") {
        instance.apiKey = options.apiKey;
      }
  
      if (typeof options.load !== "undefined") {
        if (options.load) {
          instance.books = getStoredBooks();
        }
      } else {
        instance.books = getStoredBooks();
      }
    }
  }
  
  return {
    getInstance: function(options) {
      init(options);
      return instance;
    }
  };
})();
