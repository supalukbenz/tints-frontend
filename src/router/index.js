import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
  },
  {
    path: '/makeup-ref',
    name: 'Makeup By Reference',
    component: () =>
      import(/* webpackChunkName: "MakeupByRef" */ '@/views/MakeupByRef.vue')
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: () =>
      import(/* webpackChunkName: "Simulator" */ '@/views/Simulator.vue')
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: () =>
      import(/* webpackChunkName: "Recommendation" */ '@/views/Recommendation.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Recommendation" */ '@/views/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
