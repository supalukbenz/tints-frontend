import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipstickListByImageRef,

} from '@/api/reference';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imageRef: '',
    lipstickListByImgRef: [],
  },
  getters: {
    getSortedLipstickList: state => {
      return state.lipstickListByImgRef.sort((a, b) => a.deltaE - b.deltaE);
    },
  },
  mutations: {
    setImageReference(state, payload) {
      state.imageRef = payload;
    },
    setLipstickListByImgRef(state, payload) {
      state.lipstickListByImgRef = payload;
    },
  },
  actions: {
    updateImageReference({ commit }, payload) {
      commit('setImageReference', payload);
    },
    updateLipstickListByImgRef({ commit }, payload) {
      commit('setLipstickListByImgRef', payload);
    },
    async loadLipstickListByImgRef({ commit }, payload) {
      commit('setLipstickListByImgRef', await getLipstickListByImageRef(payload));
    }
  },
  modules: {

  },
});
