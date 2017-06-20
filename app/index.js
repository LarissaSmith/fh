import Vue from 'vue';
import VueRouter from 'vue-router';

import 'core-js/es6/promise';
import 'core-js/es6/object';

import './styles/main.scss';
import { router } from './pages';
import * as components from './components';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  components,
  template:
`<router-view></router-view>`
});