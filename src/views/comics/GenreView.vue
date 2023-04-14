<template>
  <!-- Breadcrumb Begin -->
  <div class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__links">
            <a href="./index.html"><i class="fa fa-home"></i> Home</a>
            <a href="./categories.html">Categories</a>
            <span>Genre</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Breadcrumb End -->

  <!-- Product Section Begin -->
  <section class="product-page spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="product__page__content">
            <div class="product__page__title">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-6">
                  <div class="section-title">
                    <h4>Genre</h4>
                  </div>
                </div>
              </div>
              <div class="row content-genre">
                <div class="item-checkbox-genre" v-for="genre in genres" :key="genre.id">
                  <article class="feature1">
                    <input type="checkbox" name="checkGenre[]" :checked="genre.slug == slug_param" :value="genre.slug" ref="genreInputs" @click="filterGenre()"/>
                    <div>
                      <span>
                          {{ genre.name }}
                      </span>
                    </div>
                  </article>
                  <!-- end of quiz_card_area -->
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-4 col-md-6 col-sm-6"
                v-for="item in comics"
                :key="item.id"
              >
                <div class="product__item">
                  <router-link
                    :to="{ name: 'detail-comic', params: { slug: item.slug } }"
                    class="product__item__pic set-bg"
                  >
                    <img
                      :src="`${API_URL_IMAGE + '/' + item.thumbnail}`"
                      :alt="item.name"
                    />
                    <div class="ep">{{ item.chapter_latest.name }}</div>
                    <div class="country" :title="item.country.name">
                      <img
                        :src="API_URL_IMAGE + '/' + item.country.avatar"
                        :alt="item.country.name"
                      />
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
                      <router-link
                        :to="{
                          name: 'detail-comic',
                          params: { slug: item.slug },
                        }"
                        >{{ item.name }}</router-link
                      >
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
          <paginate
            :page-count="totalPage"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'product__pagination'"
          >
          </paginate>
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
import moment from "moment";
import RightContentComponent from '@/components/RightContentComponent.vue';

export default {
  components: { RightContentComponent },
  props: {
    slug: String,
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,
      API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
      slug_param: this.$route.params.slug,
      comics: [],
      genres: [],
      totalPage: 0,
    };
  },
  async mounted() {
    this.loadComicData(this.slug_param);
  },
  methods: {
    async loadComicData(slug) {
      try {
        const response = await axios.get(
          `${this.API_URL}/page/genre-comic/${slug}`
        );
        const comics = response.data.data.comics.data;

        comics.forEach((comic) => {
          comic.chapter_latest.created_at = moment(
            comic.chapter_latest.created_at
          )
            .locale("vi")
            .fromNow(true);
        });

        this.totalPage = response.data.data.comics.last_page;
        this.slug_param = slug;
        this.genres = response.data.data.genres;
        this.comics = comics;
      } catch (error) {
        console.error(error);
      }
    },
    async filterGenre(pageNum = 1){
      const checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value);
      const response = await axios.post(`${this.API_URL}/page/filter-genre-comic`, {
          slugs: checkedGenres,
          pageNum: pageNum
      });
      const comics = response.data.data.comics.data;

        comics.forEach((comic) => {
          comic.chapter_latest.created_at = moment(
            comic.chapter_latest.created_at
          )
            .locale("vi")
            .fromNow(true);
        });
        this.comics = comics;
        this.totalPage = response.data.data.comics.last_page;
    },
    clickCallback(pageNum){
       this.filterGenre(pageNum)
    }
  },
  watch: {
    "$route.params.slug"(newValue) {
      this.loadComicData(newValue);
    },
  },
};
</script>