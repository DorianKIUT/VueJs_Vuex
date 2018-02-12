<template>
  <div id="app">
    <img src="./assets/list1.png">
    <lp-Header/>
    <router-view/>
    <button class="btn btn-primary" v-show="hide"
        @click="menu = !menu ,hide=!hide">
        Ajouter une tâche
    </button>
    <Input
      :menu="menu"
      :hide="hide"
      @display="open_menu">
    </Input>
    <modal/>
  </div>
</template>

<script>

require('./bus');
import lpHeader from './components/LpHeader'
import Input from './components/Input'
import Modal from './components/Modal'

export default {
  name: `App`,
  created(){
    this.$store.dispatch("getTodos")
  },

  components: {
    lpHeader, Input, Modal
  },
  data() {
    return {
        menu: false,
        hide: true
      }
    },
    methods:{
      open_menu: function (booléen)
      {
         this.menu = booléen
         this.hide = !booléen
      }
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
},
.img {
  width: 300px;
  display: none;
}
.btn-primary{
  background-color: #CFD3D5; 
  border-color: #CFD3D5;
}
</style>
