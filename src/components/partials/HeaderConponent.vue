<template>
   <!-- Header Section Begin -->
   <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo">
                        <router-link :to="{ name: 'home'}">
                            <img :src="`${BASE_URL}/img/logo.png`" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="header__nav">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li><a href="">Quoc gia <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <!-- <li><a href="./login.html" v-for="country in countries" :key="country.id">{{ country.name }}</a></li> -->
                                    </ul>
                                </li>
                                <li><a href="">Danh muc <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <!-- <li><a href="./login.html" v-for="category in categories" :key="category.id">{{ category.name }}</a></li> -->
                                    </ul>
                                </li>
                                <li><router-link :to="{ name: 'genre', params: {slug: ''}}">The loai <span class="arrow_carrot-down"></span></router-link>
                                    <ul class="dropdown">
                                        <li><router-link v-for="genre in genres" :key="genre.id" :to="{ name: 'genre', params: { slug: genre.slug }}">{{ genre.name }}</router-link></li>
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
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            genres: [],
        }
    },
    async mounted() {
    try {
      const response = await axios.get(
        `${this.API_URL}/component/header`
      );
      this.genres = response.data.data.genres;

    } catch (error) {
      console.error(error);
    }
  },
  }
</script>