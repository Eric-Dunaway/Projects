<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native.stop="closeDialog()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add A Book</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-tooltip left>
              <v-btn slot="activator" flat icon round dark v-on:click.stop="save()">
                <v-icon>save</v-icon>
              </v-btn>
              <span>Save Book</span>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>

        <v-container justify-center fluid fill-height v-for="(book, index) in books" :key="book.title">
          <v-container fluid grid-list-xs>
            <v-layout row justify-center align-center>
              <v-flex class="ma-0" lg6>
              <book-editor discard=true v-on:discardBook="discardBook" :index=index v-model="book.book" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
        <v-btn @click='addAnoutherBook'>Add Anouther Book</v-btn>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { Book } from "../js/library";
export default {
  name: "AddBookDialog",
  props: ["value"],
  computed: {
    displayDialog: () => this.value
  },
  data: () => ({
    dialog: null,
    notifications: false,
    sound: true,
    widgets: false,
    books: []
  }),
  created: function() {
    this.addAnoutherBook();
  },
  methods: {
    discardBook(event) {
      if (this.books.length < 2) {
        this.addAnoutherBook();
      }
      this.books.splice(event, 1);
    },
    save() {
      let books = this.books.map(function(value, index, array) {
        return new Book(value.book);
      });

      this.$store.dispatch("addBooks", books);
      this.dialog = false;
      this.books = [];
      this.addAnoutherBook();
      this.$emit("input", false);
    },
    closeDialog() {
      this.books = [];

      this.addAnoutherBook();
      this.dialog = false;
      this.$emit("input", false);
    },
    addAnoutherBook() {
      this.books.push({
        book: {
          title: "",
          author: "",
          numPages: 0,
          pubDate: new Date(Date.now()),
          cover: "/static/img/book.svg"
        }
      });
    }
  },
  watch: {
    value: function() {
      this.dialog = this.value;
    }
  }
};
</script>
