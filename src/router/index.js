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
      import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '@/views/Register.vue')
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    component: () =>
      import(/* webpackChunkName: "User Profile" */ '@/views/UserProfile.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {  
  const token = localStorage.getItem('token')
  if (to.path != '/login' && !token && to.path != '/register') {
    next({
      name: 'Login'
    });
  } else if (to.path == '/login' && token) {
    next({
      name: 'Home'
    });
  } else if (to.path == '/register' && token) {
    next({
      name: 'Home'
    });
  } else
  {
    next();
  }
});

export default router;
