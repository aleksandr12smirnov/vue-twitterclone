import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound  from './views/PageNotFound.vue';
import Home from './views/Home.vue';
import API from './views/API.vue';
import Signup from './views/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/api',
      name: 'pagenotfound',
      component: API
    },
    { path: '**', component: PageNotFound }
  ],
});
