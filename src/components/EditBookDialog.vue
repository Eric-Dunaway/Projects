<template>
  <v-layout fluid row align-center justify-center>
    <v-dialog v-model="dialog" max-width="600" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native.stop="closeEditDialog()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit A Book</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-tooltip left>
              <v-btn slot="activator" flat icon round dark v-on:click.stop="saveEdit()">
                <v-icon>save</v-icon>
              </v-btn>
              <span>Save Book</span>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout fluid row wrap fill-height align-center justify-center>
          <v-flex >
            <book-editor v-model="selectedBook" />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "EditBookDialog",
  props: ["value", "book"],
  data: () => ({
    dialog: null,
    selectedBook: {
      title: "",
      author: "",
      numPages: 0,
      pubDate: Date(Date.now()),
      cover: "/static/img/book.svg"
    },
    holdBookTitle: ""
  }),
  methods: {
    saveEdit() {
      let newValues = {
        cover: this.selectedBook.cover,
        title: this.selectedBook.title,
        author: this.selectedBook.author,
        numPages: this.selectedBook.numPages,
        pubDate: new Date(this.selectedBook.pubDate)
      };
      this.$store.dispatch("updateBook", {
        newValues: newValues,
        title: this.holdBookTitle
      });
      this.closeEditDialog();
      this.selectedBook;
    },
    closeEditDialog() {
      this.dialog = !this.dialog;
      this.$emit("input", this.dialog);
    }
  },
  watch: {
    book: function() {
      this.holdBookTitle = this.book.title;
      this.selectedBook = this.book;
    },
    value: function() {
      this.dialog = this.value;
    }
  }
};
</script>