import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { VueModalDialog } from 'vue-modal-dialog';
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
Vue.use(VueModalDialog);

const appStore = new Vuex.Store(store);

// these services need access to the instantiated store
// they are init'd before the components are attached to the Vue instance
KeyService.setStore(appStore);
FocusService.setStore(appStore);

new Vue({
  el: '#app',
  store: appStore,
  router,
  components,
  template:
`<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
    ${svgSymbols}
    <router-view></router-view>
    <modal-dialog></modal-dialog>
</div>`
});