import VueRouter from 'vue-router';
import { IndexingComponent } from './indexing/indexing.component';

const routes = [
  { path: '/', component: IndexingComponent },
];

export const router = new VueRouter({
  mode: 'history',
  routes
});