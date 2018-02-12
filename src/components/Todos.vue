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
          <tr v-for="row in todos" :key="row.id">

            <td v-bind:class="{ done: row.isDone }">
              <span v-if="!row.edit">{{row.label}}</span>
              <input type="tache" v-else v-model="row.label"
              class="form-control">
            </td>

            <td v-bind:class="{ opacity: row.isDone }">
              <input type="checkbox" id="row.isDone" v-model="row.isDone">
              <label for="checkbox"></label>
            </td>

            <td :style="{textAlign: 'center'}">
              <a v-show="!edition_mode && !row.isDone"
                @click="launchEdit(row)">
                <i class="fas fa-align-justify"></i>
              </a>
              <a v-show="!edition_mode && row.isDone"
                 @click.prevent="test_modal(row)">
                <i class="fa fa-times fa-lg modal-close"></i>
              </a>
              <a v-show="edition_mode && row.edit"
                 @click.prevent="cancelEdit(row)">
                <i class="fa fa-times fa-lg modal-close"></i>
              </a>
              <a v-show="edition_mode && row.edit"
                 @click.prevent="UPDATE_TODOS(row)">
                <i class="fa fa-check fa-lg modal-close"></i>
              </a>
            </td>

          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

import Vue from 'vue';
import api from '../api';
import VeeValidate from 'vee-validate';
import axios from 'axios';

const config = {
    errorBagName: 'errors', // change if property conflicts
    fieldsBagName: 'fieldss',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true,
    i18n: null, // the vue-i18n plugin instance,
    i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
};
Vue.use(VeeValidate, config);
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
    },
    del(){
      return this.$store.getters.del;
    },
    update(){
      return this.$store.getters.update;
    },

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

    DEL_TODOS: function (row) {
      this.$store.commit({
        type: 'DEL_TODOS',
        del_task: row.id
      })
      this.$store.dispatch("delTodos", [row.id])
      setTimeout(this.get_todo_again, 150)
    },

    UPDATE_TODOS: function (row) {
      this.$store.commit({
        type: 'UPDATE_TODOS',
        update_task: [ row.id, row.label, row.isDone 
      ]})
      this.$store.dispatch("updateTodos", [row.id, row.label, row.isDone ] );
      row.edit = false;
      this.edition_mode = false;
      setTimeout(this.get_todo_again, 150)
    },

    test_modal: function (row) {
      this.$bus.$emit(
          'open-modal',
          'Confirmation',
          "Voulez vous vraiment supprimer la tâche " +  row.label + " ?"
      );
      this.$nextTick(() => {
          this.$bus.$on('confirm', (result) => {
              if(result) this.DEL_TODOS(row);
              this.$bus.$off('confirm');
          });
      });
    },
    
    get_todo_again: function (){
        this.$store.dispatch("getTodos");
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
input{
  text-align: center;
 
}
.done
{
  text-decoration: line-through;
  opacity: 0.2
}
.opacity
{
  opacity: 0.2
}
</style>
