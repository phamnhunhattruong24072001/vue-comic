import { createStore } from 'vuex';

const store = createStore({
    modules: {
        auth: require('@/store/modules/auth').default,
        home: require('@/store/modules/home').default,
        detail: require('@/store/modules/detail').default,
        comment: require('@/store/modules/comment').default,
        genre: require('@/store/modules/genre').default,
        chapter: require('@/store/modules/chapter').default,
        header: require('@/store/modules/header').default,
    }
});

export default store;
