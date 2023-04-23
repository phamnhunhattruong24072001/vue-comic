import { createStore } from 'vuex';

const store = createStore({
    modules: {
        auth: require('@/store/modules/auth').default,
        home: require('@/store/modules/home').default,
        detail: require('@/store/modules/detail').default,
    }
});

export default store;
