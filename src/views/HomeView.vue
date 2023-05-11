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
                          <ComicCart v-for="item in comicNew" :item="item" :key="item.id"></ComicCart>
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
                          <comic-cart v-for="item in comicComingSoon" :item="item" :key="item.id"></comic-cart>
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
// Component
import RightContentComponent from '@/components/RightContentComponent.vue';
import ComicCart from '@/components/modules/ComicCart';
// Vuex
import { mapActions , mapGetters } from 'vuex';

export default{
    components: {
        RightContentComponent,
        ComicCart
    },
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
        };
    },
    computed: {
        ...mapGetters('home', ['comicNew', 'comicComingSoon'])
    },
    methods: {
        ...mapActions('home', ['getData']),
        getDataView: function() {
            this.getData()
        }
    },
    created() {
        this.getDataView();
    }
};
</script>



