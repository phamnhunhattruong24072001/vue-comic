<template>
    <!-- Header Section Begin -->
    <header class="header-top">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="header__logo">
                        <router-link :to="{ name: 'home' }">
                            <img :src="`${BASE_URL}/img/logo.png`" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="search-box">
                        <div class="search-box__content">
                            <input type="text" class="form-control form-search" v-model="search.text" @keyup="handleSearch" placeholder="Tìm kiếm tại đây">
                            <span class="icon-search"><i class="fa fa-search"></i></span>
                            <div class="search-box__result" v-show="search.result">
                                <ul>
                                    <li v-for="item in search.result" :key="item.id">
                                        <router-link :to="{name: 'detail-comic', params: { slug: item.slug} }" @click="search.text = ''; search.result = {}">
                                            <div class="img">
                                                <img :src="API_URL_IMAGE+'/'+item.thumbnail" alt="">
                                            </div>
                                            <div class="content-text">
                                                <b>{{ item.name }}</b>
                                                <span>{{ item.chapter_latest.name }}</span>
                                                <div class="product__item__text">
                                                    <ul>
                                                        <li v-for="genre in item.genres" :key="genre.id">
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

                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->

    <!-- Navbar -->
    <div class="header">
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
                                <li><a href="">Quốc gia <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                    </ul>
                                </li>
                                <li><a href="">Danh mục <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        
                                    </ul>
                                </li>
                                <li><router-link :to="{ name: 'genre', params: { slug: '' } }">Thể loại 
                                    <span class="arrow_carrot-down"></span></router-link>
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
import axios from 'axios';

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
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
    name: 'HeaderComponent',
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            genres: [],
            user: [],
            is_login: false,
            search: {
                result: {},
                text: '',
            },
            
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/component/header`)
        .then((response) => {
            this.genres = response.data.data.genres
        }).catch((error) => {
            console.log(error)
        });

        if (localStorage.getItem('user') && localStorage.getItem('access_token')) {
            this.user = localStorage.getItem('user');
            this.is_login = true;
        }
    },
    methods: {
        handleSearch: debounce(function()
        {
            let data = {
                'search': this.search.text,
            };
            if(this.search.text.trim().length === 0) {
                this.search.result = {};
            }else{
                axios.post(`${this.API_URL}/component/search`, data)
                .then((response) => {
                    this.search.result = response.data.data.comics
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        }, 500),
    }
}
</script>