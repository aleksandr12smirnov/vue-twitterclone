import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound  from './views/PageNotFound.vue';
import Home from './views/Home.vue';
import API from './views/API.vue';

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
      path: '/api',
      name: 'api',
      component: API
    },
    {
      path: '**',
      name: 'pagenotfound',
      component: PageNotFound
    }
  ],
});
