import VueRouter from 'vue-router';
import { BatchComponent } from './batch/batch.component';
import { MyIndexingComponent } from "./my-indexing/my-indexing.component";

const routes = [
  { path: '/batch', component: BatchComponent },
  { path: '/my-indexing', component: MyIndexingComponent }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});