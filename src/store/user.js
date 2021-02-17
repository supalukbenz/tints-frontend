import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    userProfile: {},
  },
  getters: {

  },
  mutations: {
    setUserProfile(state, payload) {
      state.userProfile = payload;
    },
  },
  actions: {
    updateUserProfile({ commit }, payload) {
      commit('setUserProfile', payload);
    },
  },
  modules: {

  },
};
