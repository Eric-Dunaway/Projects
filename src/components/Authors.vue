<template>
  <v-data-table :items="authors" :headers="headers" item-key="name" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
  </v-data-table>
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
      }
    ]
  }),
  computed: {
    ...mapGetters({
      authors: "getAuthors"
    })
  }
};
</script>
