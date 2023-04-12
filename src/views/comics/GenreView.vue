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
                <div class="col-lg-4 col-md-4 col-sm-6">
                  <div class="product__page__filter">
                    <p>Order by:</p>
                    <select>
                      <option value="">A-Z</option>
                      <option value="">1-10</option>
                      <option value="">10-50</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row content-genre">
                <div class="col-sm-2" v-for="genre in genres" :key="genre.id">
                  <article class="feature1">
                    <input type="checkbox" name="checkGenre[]" :checked="genre.slug === slug_param" :value="genre.slug" ref="genreInputs"/>
                    <div>
                      <span>
                          {{ genre.name }}
                      </span>
                    </div>
                  </article>
                  <!-- end of quiz_card_area -->
                </div>
                <div class="col-lg-12 text-center p-2">
                      <button class="btn btn-primary" @click="filterGenre()">Filter</button>
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
          <div class="product__pagination">
            <a href="#" class="current-page">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#"><i class="fa fa-angle-double-right"></i></a>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-8">
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
              <div class="filter__gallery">
                <div
                  class="product__sidebar__view__item set-bg mix day years"
                  data-setbg="img/sidebar/tv-1.jpg"
                >
                  <div class="ep">18 / ?</div>
                  <div class="view"><i class="fa fa-eye"></i> 9141</div>
                  <h5><a href="#">Boruto: Naruto next generations</a></h5>
                </div>
              </div>
            </div>
            <!-- <div class="product__sidebar__comment">
              <div class="section-title">
                <h5>New Comment</h5>
              </div>
              <div class="product__sidebar__comment__item">
                <div class="product__sidebar__comment__item__pic">
                  <img src="img/sidebar/comment-1.jpg" alt="" />
                </div>
                <div class="product__sidebar__comment__item__text">
                  <ul>
                    <li>Active</li>
                    <li>Movie</li>
                  </ul>
                  <h5>
                    <a href="#">The Seven Deadly Sins: Wrath of the Gods</a>
                  </h5>
                  <span><i class="fa fa-eye"></i> 19.141 Viewes</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Product Section End -->
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
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

        this.genres = response.data.data.genres;
        this.comics = comics;
      } catch (error) {
        console.error(error);
      }
    },
    async filterGenre(){
      const checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value);
      const response = await axios.post(`${this.API_URL}/page/filter-genre-comic`, {
          slugs: checkedGenres,
      });
      const comics = response.data.data.comics.data;

        comics.forEach((comic) => {
          comic.chapter_latest.created_at = moment(
            comic.chapter_latest.created_at
          )
            .locale("vi")
            .fromNow(true);
        });
        this.genres = response.data.data.genres;
        this.comics = comics;
    }
  },
  watch: {
    "$route.params.slug"(newValue) {
      this.loadComicData(newValue);
    },
  },
};
</script>