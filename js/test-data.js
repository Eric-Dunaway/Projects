
  var gIT = new Book({
    title: "IT",
    author: "Stephen King",
    numberOfPages: 800,
    publishDate: "December 17, 1995"
  });
  var gIT2 = new Book({
    title: "IT",
    author: "Stephen King",
    numberOfPages: 800,
    publishDate: "December 17, 1995"
  });

  var gCatherInTheRye = new Book({
    title: "Catcher In The Rye",
    author: "JD Salinger",
    numberOfPages: 200,
    publishDate: "December 25, 1987"
  });

  var Neuromancer_Gibson = new Book({
    title: "Neuromancer",
    author: "William Gibson",
    numberOfPages: 0,
    publishDate: "1/1/1984"
  });

  var Gibson = [
    new Book({
      title: "Neuromancer",
      author: "William Gibson",
      numberOfPages: 0,
      publishDate: "1/1/1984"
    }),
    new Book({
      title: "Count Zero",
      author: "William Gibson",
      numberOfPages: 0,
      publishDate: "1/1/1986"
    }),
    new Book({
      title: "Mona Lisa Overdrive",
      author: "William Gibson",
      numberOfPages: 0,
      publishDate: "1/1/1988"
    }),
    new Book({
      title: "Agency",
      author: "William Gibson",
      numberOfPages: 0,
      publishDate: "1/1/2017"
    })
  ];

  var ChroniclesOFAmber = [
    new Book({
      title: "Nine Princes in Amber",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1972"
    }),
    new Book({
      title: "The Guns of Avalon",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1970"
    }),
    new Book({
      title: "Sign of the Unicorn",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1975"
    }),
    new Book({
      title: "The Hand of Oberon",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1976"
    }),
    new Book({
      title: "The Courts of Chaos",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1978"
    }),
    new Book({
      title: "Trumps of Doom",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1985"
    }),
    new Book({
      title: "Blood of Amber",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1986"
    }),
    new Book({
      title: "Sign of Chaos",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1987"
    }),
    new Book({
      title: "Knight of Shadows",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1989"
    }),
    new Book({
      title: "Prince of Chaos",
      author: "Roger Zelazny",
      numberOfPages: 0,
      publishDate: "1/1/1991"
    })
  ];

  var Stephenson = [
    new Book({
      title: "Zodiac",
      author: "Neal Stephenson",
      numberOfPages: 0,
      publishDate: "1/1/1988"
    }),
    new Book({
      title: "Snow Crash",
      author: "Neal Stephenson",
      numberOfPages: 0,
      publishDate: "1/1/1992"
    }),
    new Book({
      title: "Cryptonomicon",
      author: "Neal Stephenson",
      numberOfPages: 0,
      publishDate: "1/1/1999"
    }),
    new Book({
      title: "The Mongoliad",
      author: "Neal Stephenson",
      numberOfPages: 5,
      publishDate: "1/1/2010"
    }),
    new Book({
      title: "Readme",
      author: "Neal Stephenson",
      numberOfPages: 0,
      publishDate: "1/1/2011"
    })
  ];
  (function() {
  var tests = function() {
    console.groupCollapsed("Add Book");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.log(gIT);
    console.log("Added One Book gIT: " + lib.addBook(gIT));
    console.log("Try to add second book matching first");
    console.log(gIT2);
    console.log("Added Same Book gIT2: " + lib.addBook(gIT2));
    console.table(lib.books);
    console.log(
      "Add a different Book gCatherInTheRye: " + lib.addBook(gCatherInTheRye)
    );
    console.table(lib.books);
    console.groupEnd();

    console.groupCollapsed("Remove Book By Title");
    console.groupCollapsed("Starting Value");
    lib.addBooks(Stephenson);
    console.table(lib.books);
    console.groupEnd();
    console.log("Remove Book IT: " + lib.removeBookByTitle("IT"));
    console.table(lib.books);
    console.groupEnd();

    console.groupCollapsed("Remove Books by Author");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.log(
      "Remove Stephenson Books: " + lib.removeBooksByAuthor("Neal Stephenson")
    );
    console.table(lib.books);
    console.groupEnd();

    console.groupCollapsed("Add Books");
    lib.removeBooksByAuthor("Neal Stephenson");
    lib.removeBooksByAuthor("Roger Zelazny");
    lib.removeBooksByAuthor("William Gibson");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.groupCollapsed("Add Books: " + lib.addBooks(Stephenson));
    console.table(lib.books);
    console.groupCollapsed("Add Same Books: " + lib.addBooks(Stephenson));
    console.table(lib.books);
    console.groupEnd();
    console.groupEnd();
    var booksAdded = lib.addBooks(ChroniclesOFAmber);
    booksAdded += lib.addBooks(Gibson);
    console.groupCollapsed("Add even More Books: " + booksAdded);
    console.table(lib.books);
    console.groupEnd();
    console.groupEnd();

    console.groupCollapsed("Get Random Book");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.group("Get a random book: ");
    console.log(lib.getRandomBook());
    console.groupEnd();
    console.group("Get a second random book: ");
    console.log(lib.getRandomBook());
    console.groupEnd();
    console.groupEnd();

    console.groupCollapsed("Get Book by Title");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.group('Get a book with "the" in title: ');
    console.table(lib.getBookByTitle("the"));
    console.groupEnd();
    console.groupEnd();

    console.groupCollapsed("Get Book by Author Name");
    lib.addBook(gIT);
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.group("Get a book with 'ing' in author's name: ");
    console.table(lib.getBooksByAuthor("ing"));
    console.groupEnd();
    console.groupEnd();

    console.groupCollapsed("Get Authors");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.group("Get author: ");
    console.table(lib.getAuthors());
    console.groupEnd();
    console.groupEnd();

    console.groupCollapsed("Get Random Author");
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.log("Random Author: " + lib.getRandomAuthorName());
    console.log("Random Second Author: " + lib.getRandomAuthorName());
    console.groupEnd();

    console.groupCollapsed("Search Function");
    lib.addBooks(Stephenson);
    console.groupCollapsed("Starting Value");
    console.table(lib.books);
    console.groupEnd();
    console.groupCollapsed('Search for a book with "The" in title by Zelazny');
    console.table(lib.search({ title: "the", author: "zelazny" }));
    console.groupEnd();
    console.groupCollapsed("Search for a Stephenson Book with 5 pages");
    console.table(lib.search({ numberOfPages: 5, author: "step" }));
    console.groupEnd();
    console.groupEnd();

    lib.removeBooksByAuthor("Stephen King");
  };
  var lib = Library.getInstance();
  tests();
})();

