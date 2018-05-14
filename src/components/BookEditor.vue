<template>
  <v-flex class="pa-1">
    <v-card class="pt-2" color="grey darken-2">
      <v-layout fill-height>
        <v-spacer></v-spacer>
        <v-tooltip v-if="discard">
          <v-btn class="ma-3" @click.stop="removeMe" slot='activator' icon>
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Discard Book</span>
        </v-tooltip>
      </v-layout>
      <v-form>
        <v-layout fill-height class="mt-4" row justify-space-around>
          <v-flex lg3>
            <v-card-media :src="cover" height="125px" contain></v-card-media>
            <v-flex lg12 class="ml-2">
              <v-switch :label="'Cover: ' + coverTypeString" v-model="coverType"></v-switch>
              <v-btn v-if="coverType" ref="fileField" @click.native.stop="selectFile">
                <v-icon>file_upload</v-icon>
              </v-btn>
              <v-text-field v-if="!coverType" v-model="cover" ref="fileField"></v-text-field>
              <input class="hide-me" ref="fileInput" @change="loadFile()" type="file">
            </v-flex>
          </v-flex>
          <v-card-text>
            <v-container fluid grid-list-xs justify-space-between>
              <v-layout fluid row wrap fill-height>
                <v-layout fluid row wrap justify-space-between>
                  <v-flex lg4 class="mx-2">
                    <v-text-field v-model="title" :v-on:onfocusout="updateModel()" label='Title'></v-text-field>
                  </v-flex>
                  <v-flex lg4 class="mx-2">
                    <v-text-field v-model="author" label='Author'></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout fluid row wrap justify-space-between>
                  <v-flex lg4 class="mx-2">
                    <v-text-field v-model="publishDate" label="Publication Date"></v-text-field>
                  </v-flex>
                  <v-flex lg4 class="mx-2">
                    <v-text-field v-model="pageCount" label="Page Count"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-layout>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "BookEditor",
  props: ["value", "index", "discard"],
  data: () => ({
    title: "",
    author: "",
    publishDate: "",
    pageCount: 0,
    valid: false,
    cover: "",
    coverTypeString: "File",
    coverType: true
  }),
  methods: {
    removeMe() {
      this.$emit("discardBook", this.index);
    },
    updateModel() {
      this.$emit("input", {
        title: this.title,
        author: this.author,
        publishDate: new Date(this.publishDate),
        numPages: this.pageCount,
        cover: this.cover
      });
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    loadFile() {
      var self = this;
      let reader = new FileReader();
      reader.onload = function() {
        self.cover = reader.result;
        self.updateModel();
      };
      if (this.$refs.fileInput.files[0].size / 1024 <= 20) {
        reader.readAsDataURL(this.$refs.fileInput.files[0]).result;
      } else {
        alert("File must be less than 21kb");
      }
    }
  },
  created() {
    this.cover = this.value.cover;
    this.title = this.value.title;
    this.author = this.value.author;
    this.publishDate = this.value.publishDate;
    this.pageCount = this.value.numberOfPages;
  },
  watch: {
    coverType: function() {
      this.coverTypeString = this.coverType ? "File" : "URL";
    },
    value: function() {
      this.cover = this.value.cover;
      this.title = this.value.title;
      this.author = this.value.author;
      this.publishDate =
        this.value.publishDate.getMonth() +
        1 +
        "/" +
        this.value.publishDate.getDate() +
        "/" +
        this.value.publishDate.getFullYear();
      this.pageCount = this.value.numberOfPages;
    }
  }
};
</script>

<style>
.hide-me {
  display: none;
}
</style>
