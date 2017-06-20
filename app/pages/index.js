import VueRouter from 'vue-router';
import { HomeComponent } from './home/home.component';

const routes = [
  { path: '/', component: HomeComponent },
];

export const router = new VueRouter({
  mode: 'history',
  routes
});