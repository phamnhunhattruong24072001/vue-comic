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
            <span>{{ chapter.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Breadcrumb End -->
  <!-- Anime Section Begin -->
  <section class="anime-details spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="control-chapter">
            <router-link
              :to="{
                name: 'chapter',
                params: { slug: slug_comic, chapter: slug_chapter },
              }"
              >Pre</router-link
            >
            <select class="form-control" v-on:change="changeChapter($event)">
              <option selected>Settings</option>
              <option
                v-for="item in comic.chapters"
                :key="item.id"
                :value="item.slug"
              >
                {{ item.name }}
              </option>
            </select>
            <router-link
              :to="{
                name: 'chapter',
                params: { slug: slug_comic, chapter: slug_chapter },
              }"
              >Next</router-link
            >
          </div>
        </div>
        <div class="col-lg-12">
          <div class="content-image">
            <div class="item-image" v-for="image in images" :key="image">
              <img :src="API_URL_IMAGE + '/' + image" alt="" />
            </div>
          </div>
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
  data() {
    return {
      chapter: [],
      comic: [],
      images: [],
      BASE_URL: process.env.VUE_APP_BASE_URL,
      API_URL: process.env.VUE_APP_API_URL,
      API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
      slug_comic: this.$route.params.slug,
      slug_chapter: this.$route.params.chapter,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        `${this.API_URL}/page/read-page/${this.slug_comic}/${this.slug_chapter}`
      );
      const chapter = response.data.data.chapter;
      const comic = response.data.data.comic;
      const images = response.data.data.chapter.content_image;
      this.chapter = chapter;
      this.comic = comic;
      this.images = JSON.parse(images);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    changeChapter(e) {
      const slug = e.target.value;
      console.log(slug);
      this.$router.push("/read-comic/"+this.slug_comic + "/" + slug);
    },
  },
};
</script>