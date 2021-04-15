import Vue from 'vue';
import Vuex from 'vuex';
import {
  getUserRecommendation,
} from '@/api/recommendation';

Vue.use(Vuex);

function suffle(list) {
  if (list) {
    let shuffled = list
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
  return shuffled
  }
}

export default{
  state: {            
    makeupRecommended: {},
  },
  getters: {
    getMakeupRecommended: state => {
      return state.makeupRecommended;
    },
    getLipRecommended: state => {
      return suffle(state.makeupRecommended.Lipstick)
    },
    getBlushRecommended: state => {
      return suffle(state.makeupRecommended.Blush)
    },
    getFoundationRecommended: state => {
      return suffle(state.makeupRecommended.Foundation)
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
