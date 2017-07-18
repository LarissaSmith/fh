import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import 'core-js/es6/promise';
import 'core-js/es6/object';

import './styles/main.scss';
import { router } from './pages';
import { store } from './store';
import * as components from './components';

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  components,
  template:
`<router-view></router-view>`
});