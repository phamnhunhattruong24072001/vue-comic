<template>
  <!-- Breadcrumb Begin -->
  <div class="breadcrumb-option">
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="breadcrumb__links">
                      <router-link :to="{name: 'genre', params: { slug: slug_param}}"><i class="fa fa-home"></i> Trang chủ</router-link>
                      <router-link :to="{name: 'genre', params: { slug: ''}}">Thể loại</router-link>
                      <span>{{ genre ? genre.name : 'Tất cả' }}</span>
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
                                      <h4>THỂ LOẠI 
                                        <span v-if="genre">- {{ genre.name }}</span>
                                        <span v-if="!genre">- TẤT CẢ</span>
                                    </h4>
                                  </div>
                              </div>
                              <div class="col-lg-4 col-md-4 col-sm-6">
                                    <div class="product__page__filter">
                                        <p>Order by:</p>
                                        <select v-model="filter.soft" @change="handleFilterData()">
                                            <option value="DESC">Mới nhất</option>
                                            <option value="ASC">Cũ nhất</option>
                                            <option value="VIEW">Top lượt xem</option>
                                            <!-- <option value="FAVORITES">Top yêu thích</option> -->
                                        </select>
                                    </div>
                              </div>
                          </div>
                          <div class="row content-genre" v-if="is_genre_slug">
                              <div class="item-checkbox-genre" v-for="genre in filter.genres" :key="genre.id">
                                  <article class="feature1">
                                      <input type="checkbox" name="checkGenre[]" :checked="genre.slug == slug_param" :value="genre.slug"
                                          ref="genreInputs" @click="handleFilterData()" />
                                      <div>
                                          <span>
                                          {{ genre.name }}
                                          </span>
                                      </div>
                                  </article>
                                  <!-- end of quiz_card_area -->
                              </div>
                          </div>
                          <div class="row">
                             <div class="col-lg-12">
                                    <div class="content-soft">
                                        <div class="inputGroup">
                                            <input name="radio" type="radio"/>
                                            <label for="radio1">Top all</label>
                                        </div>
                                        <div class="inputGroup">
                                            <input name="radio" type="radio"/>
                                            <label for="radio2">Top tháng</label>
                                        </div>
                                        <div class="inputGroup">
                                            <input name="radio" type="radio"/>
                                            <label for="radio2">Top tuần</label>
                                        </div>
                                        <div class="inputGroup">
                                            <input name="radio" type="radio"/>
                                            <label for="radio2">Top ngày</label>
                                        </div>
                                    </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-lg-4 col-md-6 col-sm-6" v-for="item in comics" :key="item.id">
                              <div class="product__item">
                                  <router-link :to="{ name: 'detail-comic', params: { slug: item.slug } }"
                                      class="product__item__pic set-bg">
                                      <img :src="`${API_URL_IMAGE + '/' + item.thumbnail}`" :alt="item.name" />
                                      <div class="ep">{{ item.chapter_latest.name }}</div>
                                      <div class="country" :title="item.country.name">
                                          <img :src="API_URL_IMAGE + '/' + item.country.avatar" :alt="item.country.name" />
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
                                          <router-link :to="{ name: 'detail-comic', params: { slug: item.slug }, }">{{ item.name}}</router-link>
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
                  <paginate :page-count="lastPage" :click-handler="handleFilterData" :prev-text="'Prev'" :next-text="'Next'"
                      :container-class="'product__pagination'">
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
    components: {
        RightContentComponent
    },
    props: {
        slug: String,
    },
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            slug_param: this.$route.params.slug,
            comics: {},
            filter: {
                genres: {},
                soft: 'DESC',
            },
            lastPage: 0,
            is_genre_slug: true,
            genre: {},
        };
    },
    methods: {
        loadData: function(slug) 
        {
            axios.get(`${this.API_URL}/page/genre-comic/${slug}`)
            .then((response) => {
                const comics = response.data.data.comics.data;
                comics.forEach((comic) => {
                    comic.chapter_latest.created_at = moment(
                            comic.chapter_latest.created_at
                        )
                        .locale("vi")
                        .fromNow(true);
                });

                this.lastPage = response.data.data.comics.last_page;
                this.slug_param = slug;
                if (this.slug_param) {
                    this.is_genre_slug = false;
                }else {
                    this.is_genre_slug = true;
                }
                this.filter = {
                    genres: response.data.data.genres,
                }
                this.comics = comics;
                this.genre = response.data.data.genre;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        filterData: function(data)
        { 
            axios.post(`${this.API_URL}/page/filter-genre-comic`, data)
            .then((response) => {
                const comics = response.data.data.comics.data;
                comics.forEach((comic) => {
                    comic.chapter_latest.created_at = moment(
                            comic.chapter_latest.created_at
                        )
                        .locale("vi")
                        .fromNow(true);
                });
                this.comics = comics;
                this.lastPage = response.data.data.comics.last_page;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        handleFilterData: function(pageNum = 1){
            const checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value);
            let softField = 'latest_chapter_time';
            let softType = this.filter.soft ?? 'DESC';
            if (this.filter.soft == 'VIEW') {
                softField = 'view';
                softType = 'DESC';
            }
            const data = {
                pageNum: pageNum,
                slugArr: checkedGenres,
                categories: [],
                countries: [],
                softField: softField,
                softType: softType
            };
            this.filterData(data)
        },
    },
    created(){
        this.loadData(this.slug_param);
    },
    mounted() {
        
    },
    watch: {
        "$route.params.slug"(newValue) {
            this.loadData(newValue);
        },
    },
};
</script>