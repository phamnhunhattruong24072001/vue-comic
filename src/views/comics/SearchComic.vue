<template>
    <!-- Breadcrumb Begin -->
    <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <router-link :to="{name: 'home'}"><i class="fa fa-home"></i> Trang chủ</router-link>
                        <span>Tìm truyện</span>
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
                <div class="col-12">
                    <div class="product__page__content">
                        <div class="product__page__title">
                            <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-6">
                                    <div class="section-title">
                                        <h4>Tìm truyện</h4>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6">
                                      <div class="product__page__filter">
                                          <p>Order by:</p>
                                          <select v-model="filter.soft" @change="handleFilterData()">
                                              <option value="DESC">Mới cập nhật</option>
                                              <option value="ASC">Cũ nhất</option>
                                              <option value="VIEW">Top lượt xem</option>
                                              <option value="HOT">Nổi bật</option>
                                              <!-- <option value="FAVORITES">Top yêu thích</option> -->
                                          </select>
                                      </div>
                                </div>
                            </div>
                            <div class="row content-genre">
                                <div class="item-checkbox-genre" v-for="country in filter.countries" :key="country.id">
                                    <article class="feature1">
                                        <input type="checkbox" name="checkCountry[]" :value="country.id"
                                            ref="countryInputs" @click="handleFilterData()" />
                                        <div>
                                            <span>
                                              {{ country.name }} 
                                              <img :src="country.avatar" alt="" height="20" width="30">
                                            </span>
                                        </div>
                                    </article>
                                    <!-- end of quiz_card_area -->
                                </div>
                            </div>
                            <div class="row content-genre">
                                <div class="item-checkbox-genre" v-for="category in filter.categories" :key="category.id">
                                    <article class="feature1">
                                        <input type="checkbox" name="checkCategory[]" :value="category.id"
                                            ref="categoryInputs" @click="handleFilterData()" />
                                        <div>
                                            <span>
                                              {{ category.name }} 
                                            </span>
                                        </div>
                                    </article>
                                    <!-- end of quiz_card_area -->
                                </div>
                            </div>
                            <div class="row content-genre">
                                <div class="item-checkbox-genre" v-for="genre in filter.genres" :key="genre.id">
                                    <article class="feature1">
                                        <input type="checkbox" name="checkGenre[]" :value="genre.id"
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
                                              <input id="radio1" name="radio" type="radio"/>
                                              <label for="radio1">Top all</label>
                                          </div>
                                          <div class="inputGroup">
                                              <input id="radio2" name="radio" type="radio"/>
                                              <label for="radio2">Top tháng</label>
                                          </div>
                                          <div class="inputGroup">
                                              <input id="radio3" name="radio" type="radio"/>
                                              <label for="radio3">Top tuần</label>
                                          </div>
                                          <div class="inputGroup">
                                              <input id="radio4" name="radio" type="radio"/>
                                              <label for="radio4">Top ngày</label>
                                          </div>
                                      </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <comic-cart class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in comics" :item="item" :key="item.id"></comic-cart>
                        </div>
                    </div>
                    <paginate :page-count="lastPage" :click-handler="handleFilterData" :prev-text="'Prev'" :next-text="'Next'"
                        :container-class="'product__pagination'">
                    </paginate>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Section End -->
  </template>
  
  <script>
  import { mapActions, mapState }  from 'vuex';
  import ComicCart from '@/components/Common/ComicCart';
  
  export default {
      data() {
          return {
              BASE_URL: process.env.VUE_APP_BASE_URL,
              API_URL: process.env.VUE_APP_API_URL,
              API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
              query: this.$route.query,
          };
      },
      components: {
        ComicCart,
      },
      computed: {
          ...mapState('page', ['comics', 'filter', 'lastPage']),
      },
      methods: {
          ...mapActions('page', ['getAllComic', 'filterData']),
          handleFilterData: function(pageNum = 1){
              const checkedCountries = this.$refs.countryInputs.filter(input => input.checked).map(input => input.value);
              const checkedCategories = this.$refs.categoryInputs.filter(input => input.checked).map(input => input.value);
              const checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value);
              
              let softField = 'latest_chapter_time';
              let softType = this.filter.soft ?? 'DESC';
              let highlight = false;
              if (this.filter.soft == 'VIEW') {
                  softField = 'view';
                  softType = 'DESC';
              }
              if (this.filter.soft == 'HOT') {
                  highlight = true;
                  softType = 'DESC';
              }
              const data = {
                  pageNum: pageNum,
                  genres: checkedGenres,
                  categories: checkedCategories,
                  countries: checkedCountries,
                  softField,
                  softType,
                  highlight
              };
              this.filterData(data);
          },
      },
      mounted(){
          if(this.$route.query.type) {
            this.getAllComic(this.$route.query.type);
          }
      },
      watch: {
        "$route.params.slug"() {
            this.getAllComic(this.$route.query.type);
        },
    },
  };
  </script>