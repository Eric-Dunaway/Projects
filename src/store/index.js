import Vue from 'vue'
import Vuex from 'vuex'
import { Library, Book } from '../js/library';



Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      libApp: {},
      randomBook:{}
    },

    actions: {
      init_library: (context, message) => { context.commit('initialize_library', message); },
      addBooks: (context, message) => { context.commit('addBooks', message); },
      removeBook: (context,message)=>{context.commit('removeBook', message);},
      removeAuthor:(context, message)=>{context.commit('removeAuthor',message)},
      updateBook: (context,message)=>{context.commit('updateBook', message);},
      setRandom:(context)=>{context.commit('setRandom');}
    },

    mutations: {
      initialize_library: (state, message) => { state.libApp = Library.getInstance();
      },
      removeBook:(state,message)=>{ state.libApp.removeBookByTitle(message.title);},
      removeAuthor:(state,message)=>{state.libApp.removeBookByTitle(message);},
      updateBook:(state,message)=>{ state.libApp.updateBook(message.title, message.newValues) },
      addBooks: (state, message) => { state.libApp.addBooks(message);},
      setRandom:(state)=>{state.randomBook = state.libApp.getRandomBook();}
    },

    getters: {
      allBooks: (state) => { return state.libApp.books;},
      getAuthors: (state) => { return state.libApp.getAuthors().map(v=>({name:v}));},
      getRandomBook:(state)=>{return state.randomBook;}
    }
    
  })
}