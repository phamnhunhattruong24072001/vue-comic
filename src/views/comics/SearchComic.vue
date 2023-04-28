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
                <div class="col-xl-12 col-lg-12 col-md-8 col-sm-12">
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
                            <div class="col-lg-3 col-md-4 col-sm-6" v-for="item in comics" :key="item.id">
                                <div class="product__item">
                                    <router-link :to="{ name: 'detail-comic', params: { slug: item.slug } }"
                                        class="product__item__pic set-bg">
                                        <img :src="item.thumbnail" :alt="item.name" />
                                        <div class="ep">{{ item.chapter_latest.name }}</div>
                                        <div class="country" :title="item.country.name">
                                            <img :src="item.country.avatar" :alt="item.country.name" />
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
            </div>
        </div>
    </section>
    <!-- Product Section End -->
  </template>
  
  <script>
  import { mapActions, mapState }  from 'vuex';
  
  export default {
      data() {
          return {
              BASE_URL: process.env.VUE_APP_BASE_URL,
              API_URL: process.env.VUE_APP_API_URL,
              API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
          };
      },
      computed: {
          ...mapState('comic', ['comics', 'filter', 'lastPage']),
      },
      methods: {
          ...mapActions('comic', ['getAllComic', 'filterData']),
          loadData: function() 
          {
              this.getAllComic();
          },
          filterDataView: function(data)
          { 
              this.filterData(data);
          },
          handleFilterData: function(pageNum = 1){
              const checkedCountries = this.$refs.countryInputs.filter(input => input.checked).map(input => input.value);
              const checkedCategories = this.$refs.categoryInputs.filter(input => input.checked).map(input => input.value);
              const checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value);
              
              let softField = 'latest_chapter_time';
              let softType = this.filter.soft ?? 'DESC';
              if (this.filter.soft == 'VIEW') {
                  softField = 'view';
                  softType = 'DESC';
              }
              const data = {
                  pageNum: pageNum,
                  genres: checkedGenres,
                  categories: checkedCategories,
                  countries: checkedCountries,
                  softField: softField,
                  softType: softType
              };
              this.filterDataView(data);
          },
      },
      created(){
          this.loadData();
      },
      watch: {
        "$route.params.slug"(newValue) {
            this.loadData(newValue);
        },
    },
  };
  </script>