"use strict";

import {Library,Book} from './library'

var App;
(function() {
  var instance;
  App = function() {
    if (!instance) {
      instance = this;
    }
    return instance;
  };
})();

App.prototype.init = function(options){
  let key = '';

  if(options){
    key = options.apiKey ? options.apiKey : ''
  }
    this.library = Library.getInstance({apiKey:key});
    this._findElements();
    this._initTemplates();
    this._bindEvents();
    this._clearAndFillTable();
};

App.prototype._bindEvents = function () {
      $('body').on('updateLib',{self:this},this._clearAndFillTable);
      this._bindTableRows();
};

App.prototype._bindTableRows = function(){
    this.$tableBody.find('tr').on('click',this._setSelectedBook);
}

App.prototype._findElements = function(){
    this.$tableBody = $('tbody');
    

    this.$selectedBookFields = {
      cover:$('.selected-book .sel-cover').get(0),
      title: $('.selected-book .sel-title').get(0),
      author: $('.selected-book .sel-author')[0],
      numberOfPages:$('.selected-book .sel-pages').get(0),
      publishDate: $('.selected-book .sel-publishDate').get(0)
    };
};

App.prototype._tBuilder = function(node){
    let templateBase = node.clone();
    node.remove();
    return templateBase;
}

App.prototype._initTemplates = function(){
    this._rowTemplate = this._tBuilder(this.$tableBody.find('tr'));
}

App.prototype._setSelectedBook = function(event){
    event.stopPropagation();
    let fields = app.$selectedBookFields;
    let book = $(this).data('book');
    $(fields.cover).attr("src",book.cover);
    fields.title.textContent = book.title;
    fields.author.textContent = book.author;
    fields.numberOfPages.textContent = book.numberOfPages + " pgs";
    fields.publishDate.textContent = book.publishDate.getFullYear();
};

App.prototype._clearAndFillTable = function(event) {
  let self = event ? event.data.self : this;
  let bookList = [];
  const books = self.library.books;
  for (let item in books) {
    if (books.hasOwnProperty(item)) {
      const book = books[item];
      let workingTemplate = self._rowTemplate.clone();
      jQuery.data(workingTemplate[0], "book", book);
      let tds = workingTemplate.find("td");
      tds[0].textContent = book.title;
      tds[1].textContent = book.author;
      tds[2].textContent = book.numberOfPages;
      tds[3].textContent = book.publishDate.getFullYear();
      bookList.push(workingTemplate);
    }
  }
  self.$tableBody.empty();
  self.$tableBody.append(bookList);
  self._bindTableRows();
};

export default App;