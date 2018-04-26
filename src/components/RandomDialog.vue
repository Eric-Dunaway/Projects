<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native.stop="closeDialog()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Book Recomendation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-flex justify-center>
            <v-card class="white--text trigger">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7 class="pb-0">
                    <div>
                      <div class="title mb-1">{{book.title}}</div>
                      <div class="body-1">{{book.author}}</div>
                      <div class="caption">{{book.publishDate.getFullYear()}}</div>
                      <div class="caption">{{book.numberOfPages}} pgs</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media :src="book.cover" height="125px" contain></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RandomDialog",
  props: ["value"],
  created: function() {
    this.$store.dispatch("setRandom");
  },
  computed: {
    displayDialog: () => this.value,
    ...mapGetters({
      book: "getRandomBook"
    })
  },
  data: () => ({
    dialog: null
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("input", false);
    }
  },
  watch: {
    value: function() {
      this.dialog = this.value;
    }
  }
};
</script>
