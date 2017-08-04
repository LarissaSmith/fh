import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { svgSymbols } from './components/icons/svg-symbols';

import 'core-js/es6/promise';
import 'core-js/es6/object';

import './styles/main.scss';
import { KeyService } from 'services/key.service';
import { FocusService } from 'services/focus.service';

import * as FS from './mock-fs';

window.FS = FS;

import { router } from './pages';
import { store } from './store';
import * as components from './components';

Vue.use(Vuex);
Vue.use(VueRouter);

const appStore = new Vuex.Store(store);

// these services need access to the store
KeyService.init(appStore);
FocusService.init(appStore);

new Vue({
  el: '#app',
  store: appStore,
  router,
  components,
  template:
`<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
    ${svgSymbols}
    <router-view></router-view>
</div>`
});