<template>
  <div>
  <table class="table table-bordered table-striped">
        <thead>
            <tr>
             <th class="col-sm-4">Tâches</th>
             <th class="col-sm-4">Etats</th>
             <th class="col-sm-2">Actions</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="row in todos" :key="row.id" v-bind:class="{ done: row.isDone }">
            <td>
              <span v-if="!row.edit">{{row.label}}</span>
              <input type="tache" v-else v-model="row.label"
              class="form-control">
            </td>
            <td>
              <!--<span v-if="row.isDone">"fait"</span>-->
              <input type="checkbox" id="row.isDone" v-model="row.isDone">
              <label for="checkbox"></label>
            </td>
            <td :style="{textAlign: 'center'}">
              <a v-show="!edition_mode"
                @click="launchEdit(row)">
                <i class="fas fa-align-justify"></i>
              </a>
              <a v-show="edition_mode && row.edit"
                 @click.prevent="cancelEdit(row)">
                <i class="fa fa-times fa-lg modal-close"></i>
              </a>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

import api from '../api';

export default {
  name: `Todos`,
  data() {
    return {
      edition_mode: false,
      edit_row: {},
    };
  },
  computed: {
    count(){
      return this.$store.getters.count;
    },
    todos(){
      return this.$store.getters.todos;
    }
  },
  methods: {
    launchEdit: function (row)  {
      row.edit = true;
      this.edition_mode = true;
      this.edit_row = Object.assign(this.edit_row, row);
    },
    cancelEdit: function (row) {
      row = Object.assign(row, this.edit_row);
      row.edit = false;
      this.edition_mode = false;
    },
  },
  
};
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  // display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.done
{
  text-decoration: line-through;
}
</style>
