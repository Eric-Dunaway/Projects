<template>
<v-container fluid grid-list-lg>

  <v-flex lg6>
    
          <v-form>
            <v-layout row justify-space-around>
              <v-flex lg3>
                <v-card-media :src="cover" height="125px" contain></v-card-media>
                <v-flex >
                  <v-switch :label="'Cover: ' + coverTypeString" v-model="coverType"></v-switch>
               <v-btn v-if="coverType" ref="fileField" @click.native.stop="selectFile"> <v-icon>file_upload</v-icon> </v-btn>
               <v-text-field v-if="!coverType" v-model="cover" ref="fileField"></v-text-field>
                <input class="hidden" ref="fileInput" @change="loadFile()" type="file">
              </v-flex>
              </v-flex>
              <v-flex class="slim">
              <v-layout row wrap justify-space-around>
              <v-flex lg3>
                <v-text-field v-model="title" :v-on:onfocusout="updateModel()" label='Title'></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-text-field v-model="author" label='Author'></v-text-field> 
              </v-flex>
              </v-layout>
              <v-layout row wrap justify-space-around>
              <v-flex lg3>
                <v-text-field v-model="publishDate" label="Publication Date"></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-text-field v-model="pageCount" label="Page Count"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              
            </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "BookEditor",
  props: ["value"],
  data:()=>({
    title:'',
    author:'',
    publishDate:'',
    pageCount:0,
    valid:false,
    cover:"",
    coverTypeString:"File",
    coverType:true
  }),
  methods:{
    updateModel(){
      this.$emit("input", {title:this.title,author:this.author,publishDate:new Date(this.publishDate),numberOfPages:this.pageCount,cover:this.cover});
    },
    selectFile(){
      this.$refs.fileInput.click();
    },
    loadFile(){
      var self = this;
      let reader  = new FileReader();
      reader.onload = function(){
        self.cover = reader.result;
        self.updateModel();
      }
      if(this.$refs.fileInput.files[0].size /1024 <= 20){
      reader.readAsDataURL(this.$refs.fileInput.files[0]).result;}
      else{
        alert("File must be less than 21kb")
      }
      
    }
  },
  created(){
      this.cover = this.value.cover;
      this.title = this.value.title;
      this.author = this.value.author;
      this.publishDate = this.value.publishDate.toString();
      this.pageCount = this.value.numberOfPages;
  },
  watch:{
    coverType: function(){
      this.coverTypeString = this.coverType ? 'File' : 'URL'
    },
    value: function(){
      this.cover = this.value.cover;
      this.title = this.value.title;
      this.author = this.value.author;
      this.publishDate = this.value.publishDate.toString();
      this.pageCount = this.value.numberOfPages;
    }
  }
}
</script>
