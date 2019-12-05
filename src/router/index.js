import Vue from 'vue';
import VueRouter from 'vue-router';

import Charts from '../views/Charts.vue';
import Releases from '../views/Releases.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Charts',
    component: Charts,
  },
  {
    path: '/releases',
    name: 'Releases',
    component: Releases,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
