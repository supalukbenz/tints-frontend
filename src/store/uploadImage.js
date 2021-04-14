import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default{
  state: {
    imageUpload: null,
    fileUpload: null,
  },
  getters: {
    getImageUpload: state => {
      return state.imageUpload;
    },
    getFileUpload: state => {
      return state.fileUpload;
    },
  },
  mutations: {
    setImageUpload(state, payload) {
      state.imageUpload = payload;
    },
    setFileUpload(state, payload) {
      state.fileUpload = payload;
    },
  },
  actions: {
    updateImageUpload({ commit }, payload) {
      commit('setImageUpload', payload);
    },
    updateFileUpload({ commit }, payload) {
      commit('setFileUpload', payload);
    },
  },
};
