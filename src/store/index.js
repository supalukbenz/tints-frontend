import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/user.js';
import makeupByRef from '@/store/makeupByRef.js';
import uploadImage from '@/store/uploadImage.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    makeupByRef,
    uploadImage,
  },
});
