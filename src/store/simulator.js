import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipSimulator,
  getBlushSimulator,

} from '@/api/simulator';

Vue.use(Vuex);

export default{
  state: {
    lipSimulator: null,
    lipSimulatedImage: null,
    blushSimulatedImage: null,
    blushSimulator: null,
  },
  getters: {
    getLipSimulatorDetail: state => {
      return state.lipSimulator;
    },
    getBlushSimulatorDetail: state => {
      return state.blushSimulator;
    },
    getLipSimulatedImage: state => {
      return state.lipSimulatedImage;
    },
    getBlushSimulatedImage: state => {
      return state.blushSimulatedImage;
    }
  },
  mutations: {
    setLipSimulatorDetail(state, payload) {
      state.lipSimulator = payload;
    },
    setBlushSimulatorDetail(state, payload) {
      state.blushSimulator = payload;
    },
    setlipSimulatedImage(state, payload) {
      state.lipSimulatedImage = payload;
    },
    setBlushSimulatedImage(state, payload) {
      state.blushSimulatedImage = payload;
    }
  },
  actions: {
    updateLipSimulator({ commit }, payload) {
      commit('setLipSimulatorDetail', payload);
    },
    updateBlushSimulator({ commit }, payload) {
      commit('setBlushSimulatorDetail', payload);
    },
    async loadLipSimulated({ commit }, payload) {
      commit('setlipSimulatedImage', await getLipSimulator(payload));
    },
    async loadBlushSimulated({ commit }, payload) {
      commit('setBlushSimulatedImage', await getBlushSimulator(payload));
    }
  },
};
