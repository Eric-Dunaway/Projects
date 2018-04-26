import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'
import AddBookDialog from './components/AddBookDialog'
import BookEditor from '@/components/BookEditor'
import EditBookDialog from '@/components/EditBookDialog'
import RandomDialog from '@/components/RandomDialog'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('addBookDialog', AddBookDialog);
Vue.component('book-editor', BookEditor);
Vue.component('editBookDialog', EditBookDialog);
Vue.component('randomDialog', RandomDialog);

const store = createStore();
sync(store, router)

store.dispatch('init_library')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
