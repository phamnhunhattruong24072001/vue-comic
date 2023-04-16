<template>
  <div class="product__sidebar">
     <div class="product__sidebar__view">
        <div class="section-title">
           <h5>Top Views</h5>
        </div>
        <ul class="filter__controls">
           <li class="active" data-filter="*">Day</li>
           <li data-filter=".week">Week</li>
           <li data-filter=".month">Month</li>
           <li data-filter=".years">Years</li>
        </ul>
        <div v-if="comicTopViews !== []">
           <router-link class="filter__gallery" v-for="item in comicTopViews" :key="item.id"
              :to="{ name: 'detail-comic', params: { slug: item.slug } }">
              <div class="product__sidebar__view__item set-bg mix day years">
                 <img :src="API_URL_IMAGE + '/' + item.cover_image" alt="" />
                 <div class="ep">{{ item.chapter_latest.name }}</div>
                 <div class="view"><i class="fa fa-eye"></i> {{ item.view }}</div>
                 <h5>
                    <a>{{ item.name }}</a>
                 </h5>
              </div>
           </router-link>
        </div>
     </div>
     <div class="product__sidebar__comment">
        <div class="section-title">
           <h5>Highlight</h5>
        </div>
        <div v-if="comicHighlights !== []">
           <router-link class="product__sidebar__comment__item" v-for="item in comicHighlights" :key="item.id"
              :to="{ name: 'detail-comic', params: { slug: item.slug } }">
              <div class="product__sidebar__comment__item__pic">
                 <img :src="API_URL_IMAGE + '/' + item.thumbnail" alt="" />
              </div>
              <div class="product__sidebar__comment__item__text">
                 <ul>
                    <li v-for="genre in item.genres" :key="genre.name">
                       {{ genre.name }}
                    </li>
                 </ul>
                 <h5>
                    <a>{{ item.name }}</a>
                 </h5>
                 <span><i class="fa fa-eye"></i> {{ item.view }} Viewes</span>
              </div>
           </router-link>
        </div>
     </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "RightContentComponent",
    data() {
        return {
            comicHighlights: [],
            comicTopViews: [],
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
        };
    },
    async mounted() {
        try {
            const response = await axios.get(`${this.API_URL}/page/right-content`);

            const comicHighlights = response.data.data.comic_highlight;
            const comicTopViews = response.data.data.comic_top_view;

            this.comicHighlights = comicHighlights;
            this.comicTopViews = comicTopViews;

        } catch (error) {
            console.error(error);
        }
    },
};
</script>