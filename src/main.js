import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyload from "vue-lazyload";
import Paginate from "vuejs-paginate-next";
import store from "./store";

import HeaderComponent from "@/components/partials/HeaderComponent.vue";
import FooterComponent from "@/components/partials/FooterComponent.vue";
import CommentComponent from "@/components/CommentComponent.vue";
import RightContentComponent from "@/components/RightContentComponent.vue";

const app = createApp(App);

app.use(VueLazyload, {
    preLoad: 1.3, // the number of image height you want to preload before it appears in the viewport
    error: "https://via.placeholder.com/100x100.png?text=Error", // the error image URL if the image fails to load
    loading: "https://via.placeholder.com/100x100.png?text=Loading", // the loading image URL while the image is loading
    attempt: 1, // the number of attempts to load the image before giving up
});
app.use(router);
app.use(store);

app
    .component("HeaderComponent", HeaderComponent)
    .component("FooterComponent", FooterComponent)
    .component("CommentComponent", CommentComponent)
    .component("RightContentComponent", RightContentComponent)
    .component("paginate", Paginate);

app.mount("#app");