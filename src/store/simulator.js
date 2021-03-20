import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default{
  state: {
    lipSimulator: null,
  },
  getters: {
    getLipSimulatorDetail: state => {
      return state.lipSimulator;
    },
  },
  mutations: {
    setLipSimulator(state, payload) {
      state.lipSimulator = payload;
    },
  },
  actions: {
    updateLipSimulator({ commit }, payload) {
      commit('setLipSimulator', payload);
    },
  },
};
