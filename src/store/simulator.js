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
    makeupSimulator: null,
    makeupSimulatedImage: null,
    makeupState: '',
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
    },
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
    },
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
    updateLipSimulator({ commit }, payload) {
      commit('setLipSimulatorDetail', payload);
    },
    updateBlushSimulator({ commit }, payload) {
      commit('setBlushSimulatorDetail', payload);
    },
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
  },
};
