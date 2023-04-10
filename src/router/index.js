import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail/:slug',
    name: 'detail-comic',
    component: () => import('@/views/comics/DetailView.vue'),
    props: true,
  },
  {
    path: '/read-comic/:slug/:chapter',
    name: 'chapter',
    component: () => import('@/views/comics/ChapterView.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
