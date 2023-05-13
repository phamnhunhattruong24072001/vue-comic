import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyload from "vue-lazyload";
import Paginate from "vuejs-paginate-next";
import store from "./store";

import HeaderLayout from "@/components/Layout/Header";
import FooterLayout from "@/components/Layout/Footer";

const app = createApp(App);

app.use(VueLazyload, {
    preLoad: 1.3, 
    error: "https://via.placeholder.com/100x100.png?text=Error", 
    loading: "https://via.placeholder.com/100x100.png?text=Loading", 
    attempt: 1, 
});
app.use(router);
app.use(store);

app
    .component("HeaderLayout", HeaderLayout)
    .component("FooterLayout", FooterLayout)
    .component("Paginate", Paginate);

app.mount("#app");