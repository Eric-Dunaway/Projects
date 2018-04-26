
<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer clipped temporary hide-overlay v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click.stop='addBookDialog = true'>
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add a Book</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop='getRandomBook()'>
          <v-list-tile-action>
            <v-icon>autorenew</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Get a Recomendation</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Catalog</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="authors">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>View Authors</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left prominent>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-avatar size="28" tile>
        <img src="/static/img/tgIconGreenAndGray4.png" alt="">
      </v-avatar>
      <v-toolbar-title>Techtonic Library</v-toolbar-title>
    </v-toolbar>
    <v-content>

      <router-view/>

    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
    <addBookDialog v-model="addBookDialog" />
    <randomDialog v-model="randomDialog" />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    addBookDialog: false,
    randomDialog: false
  }),
  methods: {
    getRandomBook: function() {
      this.drawer = false;
      this.$store.dispatch("setRandom");
      this.randomDialog = true;
    }
  }
};
</script>

<style>
@media screen and (min-width: 960px) {
  .hidden {
    display: none;
  }
}
.slim {
  height: 5rem;
}
</style>
