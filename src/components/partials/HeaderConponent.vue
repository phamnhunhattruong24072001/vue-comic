<template>
   <!-- Header Section Begin -->
   <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo">
                        <router-link :to="{ name: 'home'}">
                            <img :src="`${baseUrl}/img/logo.png`" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="header__nav">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li><a href="">Quoc gia <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <li><a href="./login.html" v-for="country in countries" :key="country.id">{{ country.name }}</a></li>
                                    </ul>
                                </li>
                                <li><a href="">Danh muc <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <li><a href="./login.html" v-for="category in categories" :key="category.id">{{ category.name }}</a></li>
                                    </ul>
                                </li>
                                <li><a href="">The loai <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <li><a href="./login.html" v-for="genre in genres" :key="genre.id">{{ genre.name }}</a></li>
                                    </ul>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="header__right">
                        <a href="#" class="search-switch"><span class="icon_search"></span></a>
                        <a href="./login.html"><span class="icon_profile"></span></a>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
    <!-- Header End -->
</template>

<script>
import axios from 'axios'

  export default {
    name: 'HeaderConponent',

    data(){
        return {
            countries: [],
            categories:[],
            genres:[],
            baseUrl: process.env.VUE_APP_BASE_URL,
        }
    },
    mounted(){
       axios.get("http://localhost:8000/api/country/get-list").then(response => {
          this.countries = response.data.data
       }).catch(console.error());
       axios.get("http://localhost:8000/api/category/get-list").then(response => {
          this.categories = response.data.data
       }).catch(console.error());
       axios.get("http://localhost:8000/api/genre/get-list").then(response => {
          this.genres = response.data.data
       }).catch(console.error());
    }
  }
</script>