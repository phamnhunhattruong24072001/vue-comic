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
                                        <span v-else>- TẤT CẢ</span>
                                    </h4>
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
                          <div class="row content-genre" v-if="slug_param == ''">
                              <div class="item-checkbox-genre" v-for="genre in filter.genres" :key="genre.id">
                                  <article class="feature1">
                                      <input type="checkbox" name="checkGenre[]" :checked="genre.slug == slug_param" :value="genre.id"
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
                            <comic-cart v-for="item in comics" :item="item" :key="item.id"></comic-cart>
                      </div>
                  </div>
                  <paginate :page-count="lastPage" :click-handler="handleFilterData" :prev-text="'Prev'" :next-text="'Next'"
                      :container-class="'product__pagination'">
                  </paginate>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-8">
                  <right-content></right-content>
              </div>
          </div>
      </div>
  </section>
  <!-- Product Section End -->
</template>

<script>
// component
import ComicCart from '@/components/Common/ComicCart';
import RightContent from '@/components/Layout/RightContent';
// vuex
import { mapActions, mapState }  from 'vuex';

export default {
    components: {
        RightContent,
        ComicCart
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
        };
    },
    computed: {
        ...mapState('page', ['comics', 'filter', 'lastPage', 'genre']),
    },
    methods: {
        ...mapActions('page', ['getDataGenre', 'filterData']),
        loadData: function(slug) 
        {
            this.slug_param = slug;
            this.getDataGenre(slug)
        },
        filterDataView: function(data)
        { 
            this.filterData(data)
        },
        handleFilterData: function(pageNum = 1){
            let checkedGenres = [];
            if(!this.slug_param) {
                checkedGenres = this.$refs.genreInputs.filter(input => input.checked).map(input => input.value)
            }
            let softField = 'latest_chapter_time';
            let softType = this.filter.soft ?? 'DESC';
            if (this.filter.soft == 'VIEW') {
                softField = 'view';
                softType = 'DESC';
            }
            const data = {
                pageNum: pageNum,
                genres: checkedGenres,
                categories: [],
                countries: [],
                softField: softField,
                softType: softType
            };
            this.filterDataView(data)
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