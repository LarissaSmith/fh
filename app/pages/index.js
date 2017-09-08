import VueRouter from 'vue-router';
import { BatchComponent } from './batch/batch.component';
import { MyIndexingComponent } from "./my-indexing/my-indexing.component";
import { ImageTaskComponent } from './image-task/image-task.component';

const routes = [
  { path: '/batch', component: BatchComponent },
  { path: '/my-indexing', component: MyIndexingComponent },
  { path: '/image-task', component: ImageTaskComponent }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});