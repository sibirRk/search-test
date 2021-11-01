import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    suggestions: [],
  },
  mutations: {
    setSuggestions(state, data) {
      state.suggestions = data;
    } 
  },
  actions: {
    async getSuggestions(context, text) {
      try {
        const data = (await axios.get(`https://api.hh.ru/suggests/areas/?text=${text}`)).data.items;
        context.commit('setSuggestions', data);
      } catch (error) {
        context.commit('setSuggestions', []);
      }
    }
  },
  getters: {
    suggestions: state => state.suggestions
  },
})
