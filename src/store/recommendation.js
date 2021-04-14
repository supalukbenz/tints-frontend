import Vue from 'vue';
import Vuex from 'vuex';
import {
  getUserRecommendation,
} from '@/api/recommendation';

Vue.use(Vuex);

export default{
  state: {            
    makeupRecommended: {},
  },
  getters: {
    getMakeupRecommended: state => {
      return state.makeupRecommended;
    },
    getLipRecommended: state => {
      return state.makeupRecommended.Lipstick;
    },
  },
  mutations: {
    setMakeupRecommended(state, payload) {
      state.makeupRecommended = payload;
    },
  },
  actions: {
    updateMakeupRecommended({ commit }, payload) {
      commit('setMakeupRecommended', payload);
    },
    async loadMakeupRecommended({ commit }) {
      commit('setMakeupRecommended', await getUserRecommendation());
    },
  },
};
