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
              <v-btn slot="activator" flat icon round dark v-on:click.stop="save()"> <v-icon>save</v-icon> </v-btn>
              <span>Save Book</span>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>

  <v-container justify-center fluid fill-height v-for="book in books" :key="book.title">
        <book-editor v-model="book.book"  />
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
    save(){
      let books = this.books.map(function(value,index,array){
        return new Book(value.book);
      });
      
      this.$store.dispatch("addBooks",books);
      this.dialog = false;
      this.books = [];
      this.addAnoutherBook();
      this.$emit("input", false);
    },
    closeDialog() {
      this.books = []

      this.addAnoutherBook();
      this.dialog = false;
      this.$emit("input", false);
    },
    addAnoutherBook() {
      this.books.push({
        book: new Book({
          title: "",
          author: "",
          numberOfPages: 0,
          publishDate: Date.now(),
          cover: "/static/img/book.svg"
        })
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
