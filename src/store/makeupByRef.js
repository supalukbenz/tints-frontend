import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipstickListByImageRef,

} from '@/api/reference';


Vue.use(Vuex);

export default{
  state: {
    imageRef: '',
    lipstickListByImgRef: [],
  },
  getters: {
    getSortedLipstickList: state => {
      return state.lipstickListByImgRef.sort((a, b) => a.deltaE - b.deltaE);
    },
    getSortedLipstickByPrice: state => feature => {
      if (feature === 'lowToHeight') {
        return state.lipstickListByImgRef.sort((a, b) => a.price - b.price);
      }
    },
    getLipstickFromId: state => id => {
      return state.lipstickListByImgRef.find(item => item._id === id);
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
};
