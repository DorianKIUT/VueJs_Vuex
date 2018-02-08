import Vue from 'vue';
import Router from 'vue-router';
import Todos from '@/components/Todos';
//import LpHeader from '@/components/LpHeader';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: `/`,
      name: `Todos`,
      component: Todos
    },

   // {
	 // path: '/',
      //name: 'LpHeader',
      //component: LpHeader
    //}
      
  ],
});
