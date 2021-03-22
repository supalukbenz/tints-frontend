import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipSimulator,

} from '@/api/simulator';

Vue.use(Vuex);

export default{
  state: {
    lipSimulator: null,
    lipSimulatedImage: null,
  },
  getters: {
    getLipSimulatorDetail: state => {
      return state.lipSimulator;
    },
    getLipSimulatedImage: state => {
      return state.lipSimulatedImage;
    }
  },
  mutations: {
    setLipSimulatorDetail(state, payload) {
      state.lipSimulator = payload;
    },
    setlipSimulatedImage(state, payload) {
      state.lipSimulatedImage = payload;
    }
  },
  actions: {
    updateLipSimulator({ commit }, payload) {
      commit('setLipSimulatorDetail', payload);
    },
    async loadLipSimulated({ commit }, payload) {
      commit('setlipSimulatedImage', await getLipSimulator(payload));
    }
  },
};
