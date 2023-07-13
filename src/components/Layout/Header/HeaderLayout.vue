<template>
    <!-- Header Section Begin -->
    <header class="header-top">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="header__logo">
                        <router-link :to="{ name: 'home' }">
                            <img :src="`${BASE_URL}/img/logo.png`" alt="" />
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="search-box">
                        <div class="search-box__content">
                            <input type="text" class="form-control form-search" v-model="search" @keyup="handleSearch()" placeholder="Tìm kiếm tại đây" />
                            <span class="icon-search"><i class="fa fa-search"></i></span>
                            <search-content v-if="resultSearch.length > 0" :result="resultSearch"/>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="right-header">
                        <div v-if="checkLogin" class="right-header__user">
                            <router-link :to="{name: 'profile'}">
                                <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="">
                            </router-link>
                            <ul class="dropdown__user">
                                <li><router-link :to="{name: 'profile'}">Tài khoản</router-link></li>
                                <li><a href="">Yêu thích</a></li>
                                <li><a href="">Lịch sử</a></li>
                                <li><a @click="handleLogout()">Đăng xuất</a></li>
                            </ul>
                        </div>
                        <router-link class="btn btn-outline-danger rounded-0" v-else :to="{name: 'login'}">Đăng nhập</router-link>
                    </div>
                    
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->

    <!-- Navbar -->
    <div class="header" :id="$route.name != 'chapter' ? 'myHeaderView' : ''">
        <nav style="background-color: aliceblue;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="header__nav">
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li>
                                        <router-link :to="{ name: 'home' }">{{ PAGE_NAME.HOME }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'searchComic', query: { type: 'highlight'} }">{{ PAGE_NAME.HOT }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'follow' }">{{ PAGE_NAME.FOLLOW }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">{{ PAGE_NAME.HISTORY }}</router-link>
                                    </li>
                                    <li class="header__menu-min">
                                        <router-link :to="{ name: 'country', params: { slug: '' } }">{{ PAGE_NAME.COUNTRY }} <span class="arrow_carrot-down"></span></router-link>
                                        <ul class="dropdown-min">
                                            <li v-for="country in countries" :key="country.id">
                                                <router-link :to="{ name: 'country', params: { slug: country.slug } }">{{ country.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="header__menu-min">
                                        <router-link :to="{ name: 'category', params: { slug: '' } }">{{ PAGE_NAME.CATEGORY }} <span class="arrow_carrot-down"></span></router-link>
                                        <ul class="dropdown-min">
                                            <li v-for="category in categories" :key="category.id">
                                                <router-link :to="{ name: 'category', params: { slug: category.slug } }">{{ category.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'genre', params: { slug: '' } }">{{ PAGE_NAME.GENRE }} <span class="arrow_carrot-down"></span></router-link>
                                        <ul class="dropdown">
                                            <li v-for="genre in genres" :key="genre.id">
                                                <router-link :to="{ name: 'genre', params: { slug: genre.slug } }">{{ genre.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'favorite' }">{{ PAGE_NAME.FAVORITE }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'searchComic' }">{{ PAGE_NAME.SEARCH_COMIC }}</router-link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </nav>
    </div>
    <!-- Navbar End -->
</template>


<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { PAGE_NAME } from './const';
import searchContent from './_component/searchContent.vue';

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export default {
    name: "HeaderLayout",
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            search: "",
            PAGE_NAME,
            show: false,
        };
    },
    components: {
        searchContent,
    },
    computed: {
        ...mapState("header", [
            "genres",
            "resultSearch",
            "checkLogin",
            "userLogin",
            "countries",
            'categories'
        ]),
    },
    created() {
        this.getDataView();
    },
    methods: {
        ...mapActions("header", ["getData", "getDataSearch"]),
        ...mapActions("auth", ["logout"]),
        ...mapMutations("header", ["setDataSearch"]),
        getDataView: function () {
            this.getData();
        },
        handleSearch: debounce(function () {
            let data = {
                search: this.search,
            };
            this.getDataSearch(data);
        }, 500),
        handleLogout: function() {
            this.logout();
        },
        resetData() {
            this.search = '';
            this.setDataSearch({
                resultSearch : [],
            })
        }
    },
};

</script>