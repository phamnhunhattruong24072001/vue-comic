import { createStore } from 'vuex';
import comic from './modules/comic';
import layout from './modules/layout';
import client from './modules/client';
import auth from './modules/auth';
import comment from './modules/comment';

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
