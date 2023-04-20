<template>
  <!-- Breadcrumb Begin -->
  <div class="breadcrumb-option">
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="breadcrumb__links">
                      <router-link :to="{ name: 'home' }">Home</router-link>
                      <router-link :to="{ name: 'home' }">{{ category.name }}
                      </router-link>
                      <span>{{ comicDetail.name }}</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!-- Breadcrumb End -->
  <!-- Anime Section Begin -->
  <section class="anime-details spad">
      <div class="container">
          <div class="anime__details__content">
              <div class="row">
                  <div class="col-lg-3">
                      <div class="anime__details__pic set-bg">
                          <img v-if="comicDetail && comicDetail.thumbnail" :src="API_URL_IMAGE + '/' + comicDetail.thumbnail"
                              alt="" />
                          <div class="country" :title="comicDetail.name">
                              <img v-if="country && country.avatar" :src="API_URL_IMAGE + '/' + country.avatar" :alt="country.name" />
                          </div>
                          <div class="comment"><i class="fa fa-comments"></i> 11</div>
                          <div class="view">
                              <i class="fa fa-eye"></i> {{ comicDetail.view }}
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-9">
                      <div class="anime__details__text">
                          <div class="anime__details__title">
                              <h3>{{ comicDetail.name }}</h3>
                              <span>{{ comicDetail.name_another }} </span>
                          </div>
                          <div class="anime__details__rating">
                              <div class="rating">
                                  <a href="#"><i class="fa fa-star"></i></a>
                                  <a href="#"><i class="fa fa-star"></i></a>
                                  <a href="#"><i class="fa fa-star"></i></a>
                                  <a href="#"><i class="fa fa-star"></i></a>
                                  <a href="#"><i class="fa fa-star-half-o"></i></a>
                              </div>
                              <span>1.029 Votes</span>
                          </div>
                          <p></p>
                          <div class="anime__details__widget">
                              <div class="row">
                                  <div class="col-lg-6 col-md-6">
                                      <ul>
                                          <li><span>Country:</span> {{ country.name }}</li>
                                          <li><span>Category:</span> {{ category.name }}</li>
                                          <li><span>Date aired:</span> Oct 02, 2019 to ?</li>
                                          <li><span>Status:</span> Airing</li>
                                          <li><span>Genre:</span> {{ genre_string }}</li>
                                      </ul>
                                  </div>
                                  <div class="col-lg-6 col-md-6">
                                      <ul>
                                          <li><span>Chapter:</span> {{ chapters.length }}</li>
                                          <li><span>Rating:</span> 8.5 / 161 times</li>
                                          <li><span>Duration:</span> 24 min/ep</li>
                                          <li><span>Quality:</span> HD</li>
                                          <li><span>Views:</span> {{ comicDetail.view }}</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div class="anime__details__btn">
                              <a href="#" class="follow-btn"><i class="fa fa-heart-o"></i> Follow</a>
                              <router-link v-if="newChapter && newChapter.slug"
                                  :to="{ name: 'chapter', params: { slug: slug_comic, chapter: newChapter.slug }, }" class="watch-btn">
                                  <span>New Chapter</span> <i class="fa fa-angle-right"></i>
                              </router-link>
                              <router-link v-if="latestChapter && latestChapter.slug"
                                  :to="{ name: 'chapter', params: { slug: slug_comic, chapter: latestChapter.slug }, }"
                                  class="watch-btn ml-2">
                                  <span>Latest Chapter</span> <i class="fa fa-angle-right"></i>
                              </router-link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-12 col-md-12">
                  <div class="anime__details__episodes">
                      <div class="section-title">
                          <h5>Chapters</h5>
                      </div>
                      <router-link v-for="chapter in chapters" :key="chapter.id"
                          :to="{ name: 'chapter', params: { slug: comicDetail.slug, chapter: chapter.slug }, }">
                          {{ chapter.name }}
                      </router-link>
                  </div>
                  <div class="anime__details__figures">
                      <div class="section-title">
                          <h5>Figures</h5>
                      </div>
                      <div class="row" v-if="figures.length > 0">
                          <div class="col-lg-4" v-for="item in figures" :key="item.id">
                              <div class="content">
                                  <div class="card">
                                      <div class="firstinfo">
                                          <img :src="API_URL_IMAGE + '/' + item.avatar">
                                          <div class="profileinfo">
                                              <h1>{{ item.name }}</h1>
                                              <h3>{{ item.character_role }}</h3>
                                              <!-- <p class="bio">{{ item.short_desc }}</p> -->
                                              <div class="profilefolow">
                                                  <span>
                                                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                                                  </span>
                                                  <span>
                                                  <i class="fa fa-heart" aria-hidden="true"></i>
                                                  </span>
                                                  <span>
                                                  <a href=""><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row" v-else>
                            <div class="ml-3 alert alert-primary" role="alert">
                               Đang cập nhật ....
                            </div>
                      </div>
                  </div>
              </div>
              <div class="col-lg-8 mt-4">
                  <comment-component v-if="comic_id" :comic_id="comic_id"></comment-component>
              </div>
              <div class="col-lg-4 col-md-4">
                  <div class="anime__details__sidebar">
                      <div class="section-title">
                          <h5>Có thể bạn thích</h5>
                      </div>
                      <div class="product__sidebar__view__item set-bg">
                          <div class="ep">18 / ?</div>
                          <div class="view"><i class="fa fa-eye"></i> 9141</div>
                          <h5><a href="#">Boruto: Naruto next generations</a></h5>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  <!-- Anime Section End -->
</template>

<script>
import axios from "axios";
import CommentComponent from '@/components/CommentComponent.vue';


export default {
  components: { CommentComponent },
    name: "DetailView",
    props: {
        slug: String,
    },
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            slug_comic: this.$route.params.slug,
            comicDetail: {},
            category: {},
            country: {},
            genres: {},
            genre_string: "",
            genreArr: [],
            chapters: {},
            newChapter: {},
            latestChapter: {},
            figures: {},
            comic_id: '',
        };
    },
    methods:{
        getData: function(slug)
        {
            axios.get(`${this.API_URL}/page/detail-page/${slug}`)
            .then((response) => {
                const comic = response.data.data.comic;
                const category = response.data.data.comic.category;
                const country = response.data.data.comic.country;
                const chapters = response.data.data.comic.chapters;
                const genres = response.data.data.comic.genres;
                const figures = response.data.data.comic.figures;

                this.comicDetail = comic;
                this.category = category;
                this.country = country;
                this.chapters = chapters;
                this.genres = genres;
                this.comic_id = comic.id;

                figures.forEach((figure) => {
                    if (figure.character_role === 0) {
                        figure.character_role = 'Nhan vat chinh';
                    } else if (figure.character_role === 1) {
                        figure.character_role = 'Nhan vat phu'
                    } else {
                        figure.character_role = 'phan dien'
                    }
                });
                this.figures = figures;

                const minKey = Math.min(...chapters.keys());
                const maxKey = Math.max(...chapters.keys());

                this.newChapter = chapters[minKey];
                this.latestChapter = chapters[maxKey];
                genres.forEach((genre, index) => {
                    this.genreArr[index] = genre.name;
                });
                this.genre_string = this.genreArr.join(", ");
            })
            .catch((error) => {
                console.log(error)
            });
        },
    },
    created(){
        this.getData(this.slug_comic);
    },
    watch: {
        "$route.params.slug"(newValue) {
            this.getData(newValue);
        },
    },
};
</script>