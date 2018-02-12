<template>
      <div class="col-md-4"v-show="menu">
          <label>Tâche</label>
              <a
                @click="close_menu()">
                <i class="fas fa-times fa-lg"></i>
              </a>
            <input name="tache" v-model="task_name" v-validate="{ required: true, regex: /^[A-Za-z0-9\-_\.\s]*$/}"
                :class="{'has_errors': errors.has('tache') }"  class="form-control" placeholder="Ajouter une tâche">
            <button class="btn btn-default" @click="validateBeforeSubmit(task_name)">Ajouter</button>
            <span v-show="errors.has('tache')" class="is-danger">
                  {{ "champ tâche invalide" }}
            </span>     
      </div>
</template>

<script>

import api from '../api';
import Vue from 'vue'
import Multiselect from 'vue-multiselect';
import VeeValidate from 'vee-validate';
import axios from 'axios';
Vue.component('select2', Multiselect);


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
const dict = {
  custom: {
    task_name: {
      required: 'Your tache is empty' // messages can be strings as well.
    },
    tache: {
      required: () => 'Your name is empty'
    }
  }
};
Vue.use(VeeValidate, config, dict);

export default {
  name: `Input`,
  props: {
    menu: {
        type: Boolean,
        default: false
    },
    hide:{
    },
  },
  data() {
    return {
      task_name: '',
      menu_hide: false,

    };
  },
  computed: {
    add(){
      return this.$store.getters.add;
    },
    todos(){
      return this.$store.getters.todos;
    },

  },
  methods: {
    NEW_TODOS: function (task_name) {
      this.$store.commit({
        type: 'NEW_TODOS',
        task: task_name
      })
      this.$store.dispatch("postTodos", [task_name]).then(() => {
      setTimeout(this.get_todo_again, 150)
      })
      this.task_name = ''
      
    },

    get_todo_again: function (){
      this.$store.dispatch("getTodos");
    },

    close_menu(){
      this.$emit('display', this.menu_hide);
      this.task_name = '';
      fields.tache.valid = true;
      config.invalid = false;
    },
    
    validateBeforeSubmit: function (task_name) {
      this.$validator.validateAll().then((result) => {
          if (result)
              this.NEW_TODOS(task_name);
      })
    },
  }
  
};
//supprime le placeholder au focus
jQuery(document).ready(function () {
jQuery('input,textarea').focus(function(){
   jQuery(this).removeAttr('placeholder');
});
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
template{
  text-align: center;
}
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
  display: inline;
}
input, button{
    vertical-align:middle;
}
input{
  border-radius: 10px;
  width: 60%;
  display: inline;
  text-align: center;
}
input::placeholder {
  font-style: italic;
  font-size: 70%;
}
button:hover{
  background-color: green;
  color: white;
}
label {
  font-weight: bold;
  font-size: 150%;
  display: inline;
  margin-right: 10px;
  padding-bottom: -20px;
}

.is-danger {
    color: #9f191f;
    font-weight: bold;
}
.col-md-4
{
  display: inline-block;
  padding-top: 10px;

}
.col-md-2 {
  display: inline;
}

.fa-times {
  color: red;
  display: inline;
  margin-top: 10px;
  float: right;
  font-size: 200%;
}

.btn-primary btn-lg
{
  display: inline-block;
}

</style>
