import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from './views/PageNotFound.vue';
import Home from './views/Home.vue';
import API from './views/API.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/profile');
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/profile');
        } else {
          next();
        }
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next();
        } else {
          location.reload();
          next('/login');
        }
      },
    },
    {
      path: '/api',
      name: 'pagenotfound',
      component: API,
    },
    {
      path: '**',
      component: PageNotFound,
    },
  ],
});
