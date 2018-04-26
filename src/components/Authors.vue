<template>
  <v-layout fluid justify-center align-center>
    <v-flex lg3>
      <v-data-table :items="authors" :headers="headers" item-key="name" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>
            <v-btn @click="removeAuthor(props.item.name)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "Name"
      },
      {
        text: "",
        sortable: false,
        value: "remove"
      }
    ]
  }),
  methods: {
    removeAuthor(author) {
      this.$store.dispatch("removeAuthor",author);
    }
  },
  computed: {
    ...mapGetters({
      authors: "getAuthors"
    })
  }
};
</script>
