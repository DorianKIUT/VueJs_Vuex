import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store ({
	state: {
		todos:[{
			id: 1,
			label: 'ce que je veux'
		}],
		name:'',
		payload: '',
		del:'',
		update: [{
			label:'',
			isDone: false
		}],
	},
	
	getters: {
		count(state) {
			return state.todos.length;
		},
		todos(state){
			return state.todos;
		},
		add(state) {
			return state.name;
		},
		del(state) {
			return state.del
		},
		update(state) {
			return state.update
		}

	},
	mutations: {
		POPULATE_TODOS(state, todos){
			state.todos = todos;
		},
		NEW_TODOS(state, payload){
			state.name = payload.task;
		},
		DEL_TODOS(state, payload){
			state.del = payload.del_task;

		},
		UPDATE_TODOS(state, payload){
			state.update = payload.update_task;

		},
	},
	actions: {
		getTodos(context){
			api.get(`/todos`)
		      .then((response) => {
		      	context.commit('POPULATE_TODOS', response.data);
		      })
		      .catch((e) => {
		        this.errors.push(e);
		      });
			},

		async postTodos(context, state){
			api.post(`/todos`, {
		    label: state[0],
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		},

		delTodos(context, state){
			api.delete(`/todos/${state[0]}`, {
		    params: {
		    	id: state[0]
		  }})
		  .then(function (response) {
		    console.log(state);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

		},
		
		updateTodos(context, state){
			api.put(`/todos/${state[0]}`, {
		    label: state[1],
		    isDone: state[2],
		  })
		  .then(function (response) {
		  	console.log(state)
		    console.log(response);


		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		},
			
		},


		
});