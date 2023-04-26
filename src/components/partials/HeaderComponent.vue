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
                            <input type="text" class="form-control form-search" v-model="search" @keyup="handleSearch" placeholder="Tìm kiếm tại đây" />
                            <span class="icon-search"><i class="fa fa-search"></i></span>
                            <div class="search-box__result" v-show="resultSearch">
                                <ul>
                                    <li v-for="item in resultSearch" :key="item.id">
                                        <router-link :to="{name: 'detail-comic', params: { slug: item.slug} }" @click="search = ''; resultSearch = []">
                                            <div class="img">
                                                <img :src="API_URL_IMAGE+'/'+item.thumbnail" alt="" />
                                            </div>
                                            <div class="content-text">
                                                <b>{{ item.name }}</b>
                                                <span>{{ item.chapter_latest.name }}</span>
                                                <div class="product__item__text">
                                                    <ul>
                                                        <li v-for="genre in genres" :key="genre.id">
                                                            {{ genre.name }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
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
                                <li><a @click="handleLogout">Đăng xuất</a></li>
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
                                        <router-link :to="{ name: 'home' }">Trang chủ</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">Hot</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">Theo giỏi</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">Lịch sử</router-link>
                                    </li>
                                    <li class="header__menu-min">
                                        <a href="">Quốc gia <span class="arrow_carrot-down"></span></a>
                                        <ul class="dropdown-min">
                                            <li v-for="country in countries" :key="country.id">
                                                <router-link :to="{ name: 'genre', params: { slug: country.slug } }">{{ country.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="header__menu-min">
                                        <a href="">Danh mục <span class="arrow_carrot-down"></span></a>
                                        <ul class="dropdown-min">
                                            <li v-for="category in categories" :key="category.id">
                                                <router-link :to="{ name: 'genre', params: { slug: category.slug } }">{{ category.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'genre', params: { slug: '' } }">Thể loại <span class="arrow_carrot-down"></span></router-link>
                                        <ul class="dropdown">
                                            <li v-for="genre in genres" :key="genre.id">
                                                <router-link :to="{ name: 'genre', params: { slug: genre.slug } }">{{ genre.name}}</router-link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">Yêu thích</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{ name: 'home' }">Tìm truyện</router-link>
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
import { mapActions, mapState } from "vuex";

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
    name: "HeaderComponent",
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            search: "",
        };
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
        }
    },
};

</script>