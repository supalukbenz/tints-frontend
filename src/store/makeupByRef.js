import Vue from 'vue';
import Vuex from 'vuex';
import {
  getLipstickListByImageRef,
  getCheekImage,
  getMakeupDetailByImageRef
} from '@/api/reference';


Vue.use(Vuex);

export default{
  state: {
    imageRef: '',
    lipstickListByImgRef: [],
    makeupByImageRef: null,
    cheekImage: '',
    predictionInfo: {},
  },
  getters: {
    getSortedLipstickByPrice: state => feature => {
      if (feature === 'lowToHeight') {
        return state.lipstickListByImgRef.sort((a, b) => a.price - b.price);
      }
    },
    getLipstickFromId: state => id => {
      return state.lipstickListByImgRef.find(item => item._id === id);
    },
    getCheekImage: state => {
      return state.cheekImage;
    },
    getMakeupByImageRef: state => {
      return state.makeupByImageRef;
    },
    getPredictionInfo: state => {
      return state.predictionInfo;
    }
  },
  mutations: {
    setImageReference(state, payload) {
      state.imageRef = payload;
    },
    setLipstickListByImgRef(state, payload) {
      state.lipstickListByImgRef = payload;
    },
    setCheekImage(state, payload) {
      state.cheekImage = payload;
    },
    setMakeupByImageRef(state, payload) {
      state.makeupByImageRef = payload;
    },
    setPredictionInfo(state, payload) {
      state.predictionInfo = payload;
    },
  },
  actions: {
    updateImageReference({ commit }, payload) {
      commit('setImageReference', payload);
    },
    updateLipstickListByImgRef({ commit }, payload) {
      commit('setLipstickListByImgRef', payload);
    },
    updateCheekImage({ commit }, payload) {      
      commit('setCheekImage', payload);
    },
    updatePredictionInfo({ commit }, payload) {      
      commit('setPredictionInfo', payload);
    },
    async updateMakeupByImageRef({ commit }, payload) {      
      commit('setMakeupByImageRef', await getMakeupDetailByImageRef(payload));
    },
    async loadLipstickListByImgRef({ commit }, payload) {      
      commit('setLipstickListByImgRef', await getLipstickListByImageRef(payload));
    },
    async loadCheekImage({ commit }, payload) {      
      commit('setCheekImage', await getCheekImage(payload));
    },
  },
};
