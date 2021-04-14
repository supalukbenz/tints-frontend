import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/user.js';
import makeupByRef from '@/store/makeupByRef.js';
import uploadImage from '@/store/uploadImage.js';
import simulator from '@/store/simulator.js';
import recommendation from '@/store/recommendation.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    makeupByRef,
    uploadImage,
    simulator,
    recommendation
  },
});
