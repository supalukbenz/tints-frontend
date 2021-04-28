import Vue from 'vue';
import Vuex from 'vuex';
import {
  userLogin
} from '@/api/authentication';
import {
  getFoundationList
} from '@/api/userFeatures';

function jsonUser(user) {
  if (typeof user !== 'undefined') {
    return JSON.parse(user);
  } else {
    return {};
  }
}

Vue.use(Vuex);

export default {
  state: {
    token: localStorage.getItem('token') || '',
    registerState: 1,
    userRegisterInfo: {},
    userInfo: jsonUser(localStorage.getItem('user')) || {},
    foundationFormList: [],
    checkFoundationForm: false,
    foundationList: {},
  },
  getters: {
    getUserInfo: state => {      
      return state.userInfo;
    },
    getUserDetail: state => {
      return state.userInfo;
    },   
    getUserToken: state => {
      return state.token;
    },
    getRegisterState: state => {
      return state.registerState;
    },
    getUserRegisterInfo: state => {
      return state.userRegisterInfo;
    },
    getFoundationFormList: state => {
      return state.foundationFormList;
    },
    getCheckFoundationForm: state => {
      return state.checkFoundationForm;
    },
    getFoundationList: state => {
      return state.foundationList;
    }
  },
  mutations: {
    setUserInfo(state, payload) {      
      state.userInfo = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    setUserToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    setRegisterState(state, payload) {
      state.registerState = payload;
    },
    setUserRegisterInfo(state, payload) {
      state.userRegisterInfo = payload;
    },
    setFoundationFormList(state, payload) {
      state.foundationFormList = payload;
    },
    setCheckFoundationForm(state, payload) {
      state.checkFoundationForm = payload;      
    },
    setFoundationList(state, payload) {
      state.foundationList = payload;      
    },
  },
  actions: {
    updateRegisterState({ commit }, payload) {
      commit('setRegisterState', payload);
    },
    updateUserRegisterInfo({ commit }, payload) {
      commit('setUserRegisterInfo', payload);
    },
    updateFoundationFormList({ commit }, payload) {
      commit('setFoundationFormList', payload);
    },
    updateCheckFoundationForm({ commit }, payload) {
      commit('setCheckFoundationForm', payload);
    },
    updateUserToken({ commit }, payload) {      
      commit('setUserToken', payload);
    },
    updateUserInfo({ commit }, payload) {
      commit('setUserInfo', payload);
    },
    async loadUserInfo({ commit }, payload) {
      commit('setUserInfo', await userLogin(payload));
    },
    async loadFoundationList({ commit }) {
      commit('setFoundationList', await getFoundationList());
    },
  },
  modules: {

  },
};
