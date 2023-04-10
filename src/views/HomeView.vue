<template>
  <!-- Hero Section Begin -->
  <section class="hero">
    <div class="container">
      <div class="hero__slider owl-carousel">
        <div class="hero__items set-bg" data-setbg="img/hero/hero-1.jpg">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero__text">
                <div class="label">Adventure</div>
                <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                <p>After 30 days of travel across the world...</p>
                <a href="#"
                  ><span>Watch Now</span> <i class="fa fa-angle-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__items set-bg" data-setbg="img/hero/hero-1.jpg">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero__text">
                <div class="label">Adventure</div>
                <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                <p>After 30 days of travel across the world...</p>
                <a href="#"
                  ><span>Watch Now</span> <i class="fa fa-angle-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__items set-bg" data-setbg="img/hero/hero-1.jpg">
          <div class="row">
            <div class="col-lg-6">
              <div class="hero__text">
                <div class="label">Adventure</div>
                <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                <p>After 30 days of travel across the world...</p>
                <a href="#"
                  ><span>Watch Now</span> <i class="fa fa-angle-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Hero Section End -->
  <!-- Product Section Begin -->
  <section class="product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="trending__product">
            <div class="row">
              <div class="col-lg-8 col-md-8 col-sm-8">
                <div class="section-title">
                  <h4>Trending Now</h4>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4">
                <div class="btn__all">
                  <a href="#" class="primary-btn"
                    >View All <span class="arrow_right"></span
                  ></a>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-4 col-md-6 col-sm-6"
                v-for="item in comicNews"
                :key="item.id"
              >
                <div class="product__item">
                  <div class="product__item__pic set-bg">
                    <img
                      :src="`${API_URL_IMAGE + '/' + item.thumbnail}`"
                      :alt="item.name"
                    />
                    <div class="ep">{{ item.chapter_latest.name }}</div>
                    <div class="country" :title="item.country.name">
                        <img :src="API_URL_IMAGE+'/'+item.country.avatar" :alt="item.country.name">
                    </div>
                    <div class="comment">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      {{ item.chapter_latest.created_at }}
                    </div>
                    <div class="view">
                      <i class="fa fa-eye"></i> {{ item.view }}
                    </div>
                  </div>
                  <div class="product__item__text">
                    <ul>
                      <li v-for="genre in item.genres" :key="genre.id">
                        {{ genre.name }}
                      </li>
                    </ul>
                    <h5>
                      <router-link
                        :to="{
                          name: 'detail-comic',
                          params: { slug: item.slug },
                        }"
                        >{{ item.name }}</router-link
                      >
                    </h5>
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
                  <a href="#" class="primary-btn"
                    >View All <span class="arrow_right"></span
                  ></a>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-4 col-md-6 col-sm-6"
                v-for="item in comicComingSoons"
                :key="item.id"
              >
                <div class="product__item">
                  <div class="product__item__pic set-bg">
                    <img
                      :src="`${API_URL_IMAGE + '/' + item.thumbnail}`"
                      :alt="item.name"
                    />
                    <div class="ep">{{ item.chapter_latest.name }}</div>
                    <div class="country" :title="item.country.name">
                        <img :src="API_URL_IMAGE+'/'+item.country.avatar" :alt="item.country.name">
                    </div>
                    <div class="comment">
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      {{ item.chapter_latest.created_at }}
                    </div>
                    <div class="view">
                      <i class="fa fa-eye"></i> {{ item.view }}
                    </div>
                  </div>
                  <div class="product__item__text">
                    <ul>
                      <li v-for="genre in item.genres" :key="genre.id">
                        {{ genre.name }}
                      </li>
                    </ul>
                    <h5>
                      <router-link
                        :to="{
                          name: 'detail-comic',
                          params: { slug: item.slug },
                        }"
                        >{{ item.name }}</router-link
                      >
                    </h5>
                  </div>
                </div>
              </div>
            </div>
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
              <div v-if="comicTopViews !== []">
                <div
                  class="filter__gallery"
                  v-for="item in comicTopViews"
                  :key="item.id"
                >
                  <div
                    class="product__sidebar__view__item set-bg mix day years"
                  >
                    <img :src="API_URL_IMAGE + '/' + item.cover_image" alt="" />
                    <div class="ep">{{ item.chapter_latest.name }}</div>
                    <div class="view">
                      <i class="fa fa-eye"></i> {{ item.view }}
                    </div>
                    <h5>
                      <router-link
                        :to="{
                          name: 'detail-comic',
                          params: { slug: item.slug },
                        }"
                        >{{ item.name }}</router-link
                      >
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="product__sidebar__comment">
              <div class="section-title">
                <h5>Highlight</h5>
              </div>
              <div v-if="comicHighlights !== []">
                <div
                  class="product__sidebar__comment__item"
                  v-for="item in comicHighlights"
                  :key="item.id"
                >
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
                      <router-link
                        :to="{
                          name: 'detail-comic',
                          params: { slug: item.slug },
                        }"
                        >{{ item.name }}</router-link
                      >
                    </h5>
                    <span
                      ><i class="fa fa-eye"></i> {{ item.view }} Viewes</span
                    >
                  </div>
                </div>
              </div>
            </div>
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
  data() {
    return {
      comicNews: [],
      comicComingSoons: [],
      comicHighlights: [],
      comicTopViews: [],
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,
      API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${this.API_URL}/page/home-page`);
      const comicNews = response.data.data.comic_new;
      const comicComingSoons = response.data.data.comic_coming_soon;
      const comicHighlights = response.data.data.comic_highlight;
      const comicTopViews = response.data.data.comic_top_view;
      comicNews.forEach((comic) => {
        comic.chapter_latest.created_at = moment(
          comic.chapter_latest.created_at
        )
          .locale("vi")
          .fromNow(true);
      });
      comicComingSoons.forEach((comic) => {
        comic.chapter_latest.created_at = moment(
          comic.chapter_latest.created_at
        )
          .locale("vi")
          .fromNow(true);
      });
      this.comicNews = comicNews;
      this.comicComingSoons = comicComingSoons;
      this.comicHighlights = comicHighlights;
      this.comicTopViews = comicTopViews;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>



