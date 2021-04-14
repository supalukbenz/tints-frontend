import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipSimulator,
  getBlushSimulator,
  getFoundationSimulator,

} from '@/api/simulator';

Vue.use(Vuex);

export default{
  state: {            
    makeupSimulator: null,
    makeupSimulatedImage: null,
    makeupState: '',
  },
  getters: {

    getMakeupSimulator: state => {
      return state.makeupSimulator;
    },
    getMakeupState: state => {
      return state.makeupState;
    },
    getMakeupSimulatedImage: state => {
      return state.makeupSimulatedImage;
    }
  },
  mutations: {
    setMakeupSimulator(state, payload) {
      state.makeupSimulator = payload;
    },
    setMakeupState(state, payload) {
      state.makeupState = payload;
    },
    setMakeupSimulatedImage(state, payload) {
      state.makeupSimulatedImage = payload;
    }
  },
  actions: {

    updateMakeupSimulator({ commit }, payload) {
      commit('setMakeupSimulator', payload);
    },
    updateMakeupState({ commit }, payload) {
      commit('setMakeupState', payload);
    },
    async loadLipSimulated({ commit }, payload) {
      commit('setMakeupSimulatedImage', await getLipSimulator(payload));
    },
    async loadBlushSimulated({ commit }, payload) {
      commit('setMakeupSimulatedImage', await getBlushSimulator(payload));
    },
    async loadFoundationSimulated({ commit }, payload) {
      commit('setMakeupSimulatedImage', await getFoundationSimulator(payload));
    },
  },
};
