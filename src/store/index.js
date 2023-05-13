import { createStore } from 'vuex';
import comic from './comic';
import layout from './layout';
import client from './client';
import auth from './auth';
import comment from './comment';

const store = createStore({
    modules: {
        auth,
        client,
        layout,
        comic,
        comment
    }
});

export default store;
