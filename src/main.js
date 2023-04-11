import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyload from "vue-lazyload";
import VueSelect2 from 'vue-select2';
// import axios from 'axios';
import HeaderConponent from '@/components/partials/HeaderConponent.vue';
import FooterConponent from '@/components/partials/FooterConponent.vue';


const app = createApp(App);

app.use(VueLazyload, {
    preLoad: 1.5, // the number of image height you want to preload before it appears in the viewport
    error: "https://via.placeholder.com/100x100.png?text=Error", // the error image URL if the image fails to load
    loading: "https://via.placeholder.com/100x100.png?text=Loading", // the loading image URL while the image is loading
    attempt: 1, // the number of attempts to load the image before giving up
});
app.use(router);
// app.use(axios);
app.component('HeaderConponent', HeaderConponent)
    .component('FooterConponent', FooterConponent);

app.mount('#app');

export default {
    component: {
        VueSelect2
    }
}