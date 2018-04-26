<template>
    <v-container fluid fill-height>
        <v-layout row wrap align-content-start>
            <v-flex hidden-sm-and-down class="slim xs3 display-2">Catalog</v-flex>
            <v-spacer hidden-xs-only class="slim"></v-spacer>
            <v-flex xs5 sm4 md2 class="slim mr-5">
                <v-select append-icon="sort" label="Sort" :items='fields' v-model="pagination.sortBy"></v-select>
            </v-flex>
            <v-flex xs5 sm4 md2 lg2 class="slim">
                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
            </v-flex>
            <v-container fluid grid-list-md class="ma-0">
                <v-data-iterator content-tag="v-layout" row wrap disable-initial-sort :search="search" :items="books" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination">
                    <v-flex xs12 sm6 md4 lg3 slot-scope="props" slot="item">
                        <v-card class="white--text trigger">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex xs7 class="pb-0">
                                        <div>
                                            <div class="title mb-1">{{props.item.title}}</div>
                                            <div class="body-1">{{props.item.author}}</div>
                                            <div class="caption">{{props.item.publishDate.getFullYear()}}</div>
                                            <div class="caption">{{props.item.numberOfPages}} pgs</div>
                                            <v-layout>
                                                <v-btn icon v-on:click="editBook(props.item)" class="hidden ma-0">
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <v-btn icon v-on:click="removeBook(props.item)" class="hidden ma-0">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </v-layout>
                                        </div>
                                    </v-flex>
                                    <v-flex xs5>
                                        <v-card-media :src="props.item.cover" height="125px" contain></v-card-media>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                    <template slot="no-results">
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing matches your search :(
                        </v-alert>
                    </template>
                </v-data-iterator>
            </v-container>
        </v-layout>
        <editBookDialog :book='editedBook' v-model="editBookDialog" />
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    fields: [
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
      { text: "Number of Pages", value: "numberOfPages" },
      { text: "Publication Date", value: "publishDate" }
    ],
    rowsPerPageItems: [5, 10, 25, 50, 75],
    pagination: {
      rowsPerPage: 25,
      sortBy: ""
    },
    editBookDialog: false,
    editedBook: null
  }),
  computed: {
    ...mapGetters({
      books: "allBooks"
    })
  },
  methods: {
    removeBook: function(book) {
      this.$store.dispatch("removeBook", book);
    },
    editBook: function(book) {
      this.editedBook = {...book};
      this.editBookDialog = true
    }
  }
};
</script>

<style>
/*.hidden is defined in App.vue */
.trigger:hover .hidden {
  display: block;
}
</style>
