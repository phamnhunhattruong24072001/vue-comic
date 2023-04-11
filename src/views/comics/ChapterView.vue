<template>
  <!-- Breadcrumb Begin -->
  <div class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__links">
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link
              :to="{ name: 'detail-comic', params: { slug: slug_comic } }"
              >{{ comic.name }}</router-link
            >
            <span>{{ chapter_detail.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Breadcrumb End -->
  <!-- Anime Section Begin -->
  <section class="anime-details spad">
    <div class="control-chapter" id="myHeader">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="left">
              <router-link :to="{ name: 'home' }"
                ><i class="fa fa-home"></i
              ></router-link>
              <router-link
                :to="{ name: 'detail-comic', params: { slug: slug_comic } }"
                ><i class="fa fa-bars" aria-hidden="true"></i
              ></router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="center">
              <router-link
                v-if="preChapter && preChapter.slug"
                :to="{
                  name: 'chapter',
                  params: { slug: slug_comic, chapter: preChapter.slug },
                }"
                >Pre</router-link>
              <select
                class="form-control js-example-basic-single"
                v-on:change="changeChapter($event)"
              >
                <option
                  v-for="item in comic.chapters"
                  :key="item.id"
                  :value="item.slug"
                  :selected="item.slug === chapter_detail.slug"
                >
                  {{ item.name }}
                </option>
              </select>
              <router-link
                v-if="nextChapter && nextChapter.slug"
                :to="{
                  name: 'chapter',
                  params: { slug: slug_comic, chapter: nextChapter.slug },
                }"
                >Next</router-link
              >
            </div>
          </div>
          <div class="col-lg-3"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row c-image">
        <div class="col-lg-12">
          <div class="content-image">
            <div class="item-image" v-for="image in images" :key="image">
              <img v-lazy="API_URL_IMAGE + '/' + image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="control-chapter">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="left">
              <router-link :to="{ name: 'home' }"
                ><i class="fa fa-home"></i
              ></router-link>
              <router-link
                :to="{ name: 'detail-comic', params: { slug: slug_comic } }"
                ><i class="fa fa-bars" aria-hidden="true"></i
              ></router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="center">
              <router-link
                v-if="preChapter && preChapter.slug"
                :to="{
                  name: 'chapter',
                  params: { slug: slug_comic, chapter: preChapter.slug },
                }"
                >Pre</router-link
              >
              <select class="form-control" v-on:change="changeChapter($event)">
                <option
                  v-for="item in comic.chapters"
                  :key="item.id"
                  :value="item.slug"
                  :selected="item.slug === chapter_detail.slug"
                >
                  {{ item.name }}
                </option>
              </select>
              <router-link
                v-if="nextChapter && nextChapter.slug"
                :to="{
                  name: 'chapter',
                  params: { slug: slug_comic, chapter: nextChapter.slug },
                }"
                >Next</router-link
              >
            </div>
          </div>
          <div class="col-lg-3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
// import moment from "moment";
export default {
  name: "ChapterView",
  props: {
    slug: String,
    chapter: String,
  },
  data() {
    return {
      chapter_detail: [],
      comic: [],
      images: [],
      preChapter: [],
      nextChapter: [],
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,
      API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
      slug_comic: this.$route.params.slug,
      slug_chapter: this.$route.params.chapter,
    };
  },
  async mounted() {
    this.loadChapterData(this.slug_chapter);
  },
  methods: {
    changeChapter(e) {
      const slug = e.target.value;
      this.$router.push("/read-comic/" + this.slug_comic + "/" + slug);
    },
    async loadChapterData(newValue) {
      try {
        const response = await axios.get(
          `${this.API_URL}/page/read-page/${this.slug_comic}/${newValue}`
        );
        const chapter = response.data.data.chapter;
        const comic = response.data.data.comic;
        const images = response.data.data.chapter.content_image;
        const preChapters = response.data.data.preChapter;
        const nextChapters = response.data.data.nextChapter;

        this.preChapter = preChapters;
        this.nextChapter = nextChapters;
        this.chapter_detail = chapter;
        this.comic = comic;
        this.images = JSON.parse(images);
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    "$route.params.chapter"(newValue) {
      this.loadChapterData(newValue);
    },
  },
};
</script>
