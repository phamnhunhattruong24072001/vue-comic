import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import axios from 'axios';
import HeaderConponent from '@/components/layouts/HeaderConponent.vue';
import FooterConponent from '@/components/layouts/FooterConponent.vue';

const app = createApp(App);
app.use(router);
// app.use(axios);

app.component('HeaderConponent', HeaderConponent)
    .component('FooterConponent', FooterConponent);

app.mount('#app');
