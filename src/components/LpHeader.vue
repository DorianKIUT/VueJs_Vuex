<template>
  <div>
    <h2>Il vous reste {{ all_data.length }} tâche(s) à faire</h2>
  </div>
</template >

<script>

import api from '../api';

export default {
  name: `lpHeader`,
  data() {
    return {
      data_todos: [],
      todos_left: [],
    };
  },
  computed: {
    count(){
      return this.$store.getters.count;
    },
    todos(){
      this.data_todos = this.$store.getters.todos;
      return this.$store.getters.todos;
      
    },
    all_data(){
      this.todos_left = [];
      for (var i = 0; i< this.$store.getters.todos.length; i++)
      {
        if (!this.$store.getters.todos[i]["isDone"] )
        {
          this.todos_left.push(this.$store.getters.todos[i]["isDone"])
        }
      }
      return this.todos_left
    }
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
</style>
