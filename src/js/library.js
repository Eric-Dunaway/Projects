import $ from 'jquery'

export class Book {
  constructor(args) {
    if (arguments.length === 1) {
      this._id = args._id;
      this.title = args.title;
      this.author = args.author;
      this.numPages = args.numPages;
      this.pubDate = new Date(args.pubDate);
      this.cover = args.cover ? args.cover : "img/book.svg";
    }
    else {
      throw new Error("Invalid input");
    }
  }
  isEquals(book) {
    return (this.title === book.title &&
      this.author === book.author &&
      this.numPages === book.numPages &&
      this.pubDate.getDate() === book.pubDate.getDate());
  }
    
  }



export var Library = (function() {

  var instance;
  var localStorageKey = "books";
  var store = true;

  class Library {
    constructor(args) {
      if (instance) {
        return instance;
      }
      this.books = [];
      this.baseUrl = args.baseUrl;
      this.pHandleGetBooks = $.proxy(this.handleGetBooks,this);
      this.pHandleAddBook = $.proxy(this.handleAddBook,this);
      this.pHandleUpdateBook = $.proxy(this.handleUpdateBook,this);
      this.pHandleRandomBook = $.proxy(this.getRandomSuccess,this);
      this.randomBook ={}
      this.getBooks()
    }
    getBooks(){

      $.getJSON(this.baseUrl,this.pHandleGetBooks)
    }
    handleGetBooks(data) {
      var results = [];

      for (var index = 0; index < data.length; index++) {
        results.push(new Book(data[index]));
      }
      this.books = results
    }
    addBook(book, ignoreUpdate) {
      for (var index = 0; index < this.books.length; index++) {
        if (book.isEquals(this.books[index])) {
          return false;
        }
      }
      this.addBookAjax(book)

      if (!ignoreUpdate) {
        updateLibrary();
      }
      return true;
    }
    addBookAjax(book){this.baseUrl,
      $.ajax(this.baseUrl,{
        method:'POST',
        data:{
          title: book.title,
          author: book.author,
          cover: book.cover,
          pubDate: book.pubDate,
          numPages: book.numPages,
        },
        success:this.pHandleAddBook
      })
    }
    handleAddBook(data){
      this.books.push(new Book(data))
    }
    removeBookByTitle(title) {
      var removed = false;
      for (var index = 0; index < this.books.length; index++) {
        if (this.books[index].title === title) {
          this.removeBook(this.books[index]);
          this.books.splice(index,1);
          removed = true;
        }
      }
      return removed;
    }
    removeBook(book){
      $.ajax(this.baseUrl+book._id,{
        method:'DELETE',
      })
    }
    removeBooksByAuthor(authorName) {
      for (var index = this.books.length -1; index >=0; index--) {
        var currentBook = this.books[index];
        if (currentBook.author === authorName) {
          this.removeBook(currentBook);
          this.books.splice(index,1);
        }
      }
      return true;
    }
    getRandomBook() {
      if (this.books.length === 0) {
        return null;
      }
      let id = this.books[Math.floor(Math.random() * this.books.length)]._id;
      $.getJSON(this.baseUrl+id,this.pHandleRandomBook)
      return true
    }
    getRandomSuccess(response){
      this.randomBook = new Book(response);
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
        book.numPages = newValues.numPages;
        book.pubDate = newValues.pubDate;
        this.updateBookAjax(book);
      }
    }
    updateBookAjax(book){
      $.ajax(this.baseUrl+book._id,{
        method:'PUT',
        success:this.pHandleUpdateBook,
      data:{...book}})
    }
    handleUpdateBook(){
      this.getBooks();
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

  function updateLibrary() {
    if (store) {
      var strings = JSON.stringify(instance.books);
      localStorage.setItem(localStorageKey, strings);
    }
  }

  function init(options) {
    if (!instance) {
      
      if(!options && !options.baseUrl){
        throw new Error('baseUrl must be defined')
      }
      instance = new Library({baseUrl:options.baseUrl});
    }
  }
  
  return {
    getInstance: function(options) {
      init(options);
      return instance;
    }
  };
})();
