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
      path: '/truyen-tranh/:slug',
      name: 'detail-comic',
      component: () => import('@/views/comics/DetailView.vue'),
      props: true,
  },
  {
      path: '/truyen-tranh/:slug/:chapter',
      name: 'chapter',
      component: () => import('@/views/comics/ChapterView.vue'),
      props: true,
  },
  {
      path: '/the-loai/:slug?',
      name: 'genre',
      component: () => import('@/views/comics/GenreView.vue'),
      props: true,
  },
  {
      path: '/dang-nhap',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
  },
  {
      path: '/dang-ky',
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