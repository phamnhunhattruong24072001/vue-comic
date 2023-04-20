<template>
  <!-- Product Section Begin -->
  <section class="product spad">
      <div class="container">
          <div class="row">
              <div class="col-lg-8">
                  <div class="trending__product">
                      <div class="row">
                          <div class="col-lg-8 col-md-8 col-sm-8">
                              <div class="section-title">
                                  <h4>New</h4>
                              </div>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="btn__all">
                                  <a href="#" class="primary-btn">View All <span class="arrow_right"></span></a>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-lg-4 col-md-6 col-sm-6" v-for="item in comicNews" :key="item.id">
                              <div class="product__item">
                                  <router-link :to="{ name: 'detail-comic', params: { slug: item.slug } }" class="product__item__pic set-bg">
                                      <img :src="`${API_URL_IMAGE + '/' + item.thumbnail}`" :alt="item.name" />
                                      <div class="ep">{{ item.chapter_latest.name }}</div>
                                      <div class="country" :title="item.country.name">
                                          <img :src="API_URL_IMAGE + '/' + item.country.avatar" :alt="item.country.name">
                                      </div>
                                      <div class="comment">
                                          <i class="fa fa-clock-o" aria-hidden="true"></i>
                                          {{ item.chapter_latest.created_at }}
                                      </div>
                                      <div class="view">
                                          <i class="fa fa-eye"></i> {{ item.view }}
                                      </div>
                                  </router-link>
                                  <div class="product__item__text">
                                      <h5>
                                          <router-link :to="{name: 'detail-comic',params: { slug: item.slug },}">{{ item.name }}</router-link>
                                      </h5>
                                      <ul>
                                          <li v-for="genre in item.genres" :key="genre.id">
                                              {{ genre.name }}
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="popular__product">
                      <div class="row">
                          <div class="col-lg-8 col-md-8 col-sm-8">
                              <div class="section-title">
                                  <h4>Coming soon</h4>
                              </div>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4">
                              <div class="btn__all">
                                  <a href="#" class="primary-btn">View All <span class="arrow_right"></span></a>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-lg-4 col-md-6 col-sm-6" v-for="item in comicComingSoons" :key="item.id">
                              <div class="product__item">
                                  <router-link :to="{ name: 'detail-comic', params: { slug: item.slug } }" class="product__item__pic set-bg">
                                      <img :src="`${API_URL_IMAGE + '/' + item.thumbnail}`" :alt="item.name" />
                                      <div class="ep">{{ item.chapter_latest.name }}</div>
                                      <div class="country" :title="item.country.name">
                                          <img :src="API_URL_IMAGE + '/' + item.country.avatar" :alt="item.country.name">
                                      </div>
                                      <div class="comment">
                                          <i class="fa fa-clock-o" aria-hidden="true"></i>
                                          {{ item.chapter_latest.created_at }}
                                      </div>
                                      <div class="view">
                                          <i class="fa fa-eye"></i> {{ item.view }}
                                      </div>
                                  </router-link>
                                  <div class="product__item__text">
                                      <h5>
                                          <router-link :to="{name: 'detail-comic',params: { slug: item.slug },}">{{ item.name }}</router-link>
                                      </h5>
                                      <ul>
                                          <li v-for="genre in item.genres" :key="genre.id">
                                              {{ genre.name }}
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-8">
                  <right-content-component></right-content-component>
              </div>
          </div>
      </div>
  </section>
  <!-- Product Section End -->
</template>

<script>
import axios from "axios";
// import moment from "moment";
import RightContentComponent from '@/components/RightContentComponent.vue';
import { formatDate } from '@/helpers/index';

export default {
    components: {
        RightContentComponent
    },
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            comicNews: {},
            comicComingSoons: {},
        };
    },
    mounted() {
        axios.get(`${this.API_URL}/page/home-page`)
        .then((response) => {
            const comicNews = response.data.data.comic_new;
            const comicComingSoons = response.data.data.comic_coming_soon;
            comicNews.forEach((comic) => {
                comic.chapter_latest.created_at = formatDate(comic.chapter_latest.created_at);
            });
            comicComingSoons.forEach((comic) => {
                comic.chapter_latest.created_at = formatDate(comic.chapter_latest.created_at);
            });
            this.comicNews = comicNews;
            this.comicComingSoons = comicComingSoons;
        }).catch((error) => {
            console.log(error);
        })
    },
};
</script>



