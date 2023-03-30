import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/DetailUserView.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
