import {
  createRouter,
  createWebHistory
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [{
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
  {
      path: '/genre-comic/:slug?',
      name: 'genre',
      component: () => import('@/views/comics/GenreView.vue'),
      props: true,
  },
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
  },
  {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/auth/ProfileView.vue'),
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;