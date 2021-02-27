import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "makeupByRed" */ '@/views/Home.vue'),
  },
  {
    path: '/makeup-ref',
    name: 'Makeup By Reference',
    component: () =>
      import(/* webpackChunkName: "makeupByRed" */ '@/views/MakeupByRef.vue')
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: () =>
      import(/* webpackChunkName: "makeupByRed" */ '@/views/Simulator.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
