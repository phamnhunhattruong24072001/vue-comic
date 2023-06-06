<template>
    <div>
        <!-- Breadcrumb Begin -->
        <div class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div v-if="loading" class="loading-breadcrumb-option loading-item"></div>
                        <div v-else class="breadcrumb__links">
                            <router-link :to="{ name: 'home' }">Trang chủ</router-link>
                            <router-link :to="{ name: 'home' }">{{ category.name }}
                            </router-link>
                            <span>{{ comic.name }}</span>
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
                            <div v-if="loading" class="loading-anime__details__pic loading-item"></div>
                            <div v-else class="anime__details__pic set-bg">
                                <img :src="comic.thumbnail" alt="" />
                                <div class="country" :title="comic.name">
                                    <img :src="country.avatar" :alt="country.name" />
                                </div>
                                <div class="comment">
                                    <i class="fa fa-comments"></i> {{ commentTotal }}
                                </div>
                                <div class="view">
                                    <i class="fa fa-eye"></i> {{ comic.view }}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div v-if="loading" class="loading-anime__details__text loading-item"></div>
                            <div v-else class="anime__details__text">
                                <div class="anime__details__title">
                                    <h4>{{ comic.name }}</h4>
                                    <span>{{ comic.name_another }} </span>
                                </div>
                                <!-- <div class="anime__details__rating">
                                    <div class="rating">
                                        <a href="#">
                                            <i class="fa fa-star"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fa fa-star"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fa fa-star"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fa fa-star"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fa fa-star-half-o"></i>
                                        </a>
                                    </div>
                                    <span>1.029 Votes</span>
                                </div> -->
                                <p></p>
                                <div class="anime__details__widget">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6">
                                            <ul>
                                                <li>
                                                    <span>Quốc gia:</span> {{ country.name }}
                                                </li>
                                                <li>
                                                    <span>Danh mục:</span> {{ category.name }}
                                                </li>
                                                <li>
                                                    <span>Date aired:</span> Oct 02, 2019 to ?
                                                </li>
                                                <li>
                                                    <span>Trạng thái:</span> Airing
                                                </li>
                                                <li>
                                                    <span>Thể loại:</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <ul>
                                                <li>
                                                    <span>Chương:</span> {{ chapters.length }}
                                                </li>
                                                <li>
                                                    <span>Xếp hạng:</span> 8.5 / 161 times
                                                </li>
                                                <li>
                                                    <span>Duration:</span> 24 min/ep
                                                </li>
                                                <li>
                                                    <span>Quality:</span> HD
                                                </li>
                                                <li>
                                                    <span>Lượt xem:</span> {{ comic.view }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-lg-12 col-md-12">
                                            <div class="anime__details__short-desc">
                                                {{ comic.short_desc ?? "Đang cập nhật......." }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="anime__details__btn">
                                    <div v-if="checkLogin">
                                        <button v-if="!is_favorite" class="follow-btn un" @click="handleAddFavorite(userLogin.id, comic.id)">
                                        <i class="fa fa-heart-o"></i> Yêu thích 
                                        </button>
                                        <button v-else class="follow-btn in" @click="handleRemoveFavorite(userLogin.id, comic.id)">
                                            <i class="fa fa-heart-o"></i> Hủy yêu thích 
                                        </button>
                                    </div>
                                    <router-link v-if="newChapter && newChapter.slug" :to="{ name: 'chapter', params: { slug: comic.slug, chapter: newChapter.slug }, }" class="watch-btn">
                                        <span>Mới nhất</span>
                                    </router-link>
                                    <router-link v-if="latestChapter && latestChapter.slug" :to="{ name: 'chapter', params: { slug: comic.slug, chapter: latestChapter.slug }, }" class="watch-btn">
                                        <span>Cũ nhất</span>
                                    </router-link>
                                    <div v-if="checkLogin">
                                        <button v-if="!is_follow && checkLogin" class="follow-btn un" @click="handleAddFollow(userLogin.id, comic.id)">
                                        <i class="fa fa-eye" aria-hidden="true"></i> Theo dõi 
                                        </button>
                                        <button v-else class="follow-btn in" @click="handleRemoveFollow(userLogin.id, comic.id)">
                                            <i class="fa fa-eye" aria-hidden="true"></i> Hủy theo dõi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-12">
                        <div v-if="loading" class="loading-anime__details__episodes loading-item"></div>
                        <div v-else class="anime__details__episodes">
                            <div class="section-title">
                                <h5>Chương truyện</h5>
                            </div>
                            <div v-if="showChapter" class="anime__details__episodes__chapters">
                                <router-link v-for="chapter in chapters" :key="chapter.id" :to="{ name: 'chapter', params: { slug: comic.slug, chapter: chapter.slug }, }">
                                    {{ chapter.name }}
                                </router-link>
                            </div>
                            <div v-else class="anime__details__episodes__chapters">
                                <div class="alert alert-primary d-block" role="alert"> Đang cập nhật .... </div>
                            </div>
                        </div>
                        
                        <div v-if="loading" class="loading-anime__details__figures loading-item"></div>
                        <div v-else class="anime__details__figures">
                            <div class="section-title">
                                <h5>Nhân vật</h5>
                            </div>
                            <div class="anime__details__figures-list" v-if="figures.length > 0">
                                <div class="row">
                                    <div class="col-lg-4" v-for="item in figures" :key="item.id">
                                        <div class="content">
                                            <div class="card">
                                                <div class="firstinfo">
                                                    <img :src="item.avatar">
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
                                                                <a href="">
                                                                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="anime__details__figures-list" v-else>
                                <div class="alert alert-primary d-block" role="alert"> Đang cập nhật .... </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div v-if="loading" class="loading-anime__details__sidebar loading-item loading-item__loader"></div>
                        <div v-else class="anime__details__sidebar">
                            <div class="section-title">
                                <h5>Có thể bạn thích</h5>
                            </div>
                            <div class="product__sidebar__view__item set-bg">
                                <div class="ep">18 / ?</div>
                                <div class="view">
                                    <i class="fa fa-eye"></i> 9141
                                </div>
                                <h5>
                                    <a href="#">Boruto: Naruto next generations</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div v-if="loading || loadingItem" class="loading-comment loading-item loading-item__loader"></div>
                        <comment-content v-else :comic_id="comic.id"></comment-content>
                    </div>
                </div>
            </div>
        </section>
        <!-- Anime Section End -->
    </div>
</template>

<script>
import CommentContent from '@/components/Comment';
import { mapActions, mapState, mapGetters }  from 'vuex';

export default {
    components: {
        CommentContent,
    },
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
            loading: true,
            loadingItem: true,
        };
    },
    computed: {
        ...mapState('detail',
            [
                'comic',
                'chapters',
                'newChapter',
                'latestChapter',
                'genres',
                'country',
                'category',
                'showChapter',
                'commentTotal'
            ]),
            ...mapState('client',[
                'checkLogin',
                'userLogin',
                'is_favorite',
                'is_follow'
            ]),
        ...mapGetters('detail', ['figures'])
    },
    created() {
        this.callActionGetDetail(this.slug_comic);
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll);
        if(window.pageXOffset > 300) {
            this.loadingItem = false;
        }
    },
    methods: {
        ...mapActions('detail', ['getData']),
        ...mapActions('client', ['checkFavorite', 'addFavorite', 'removeFavorite', 'checkFollow', 'addFollow', 'removeFollow']),
        callActionGetDetail(slug) {
            this.getData(slug)
                .then(() => {
                    this.checkFavorite(this.slug_comic);
                    this.checkFollow(this.slug_comic);
                    setTimeout(() => {
                        this.loading = false;
                    }, 300)
                })
        },
        handleScroll() {
            if (window.scrollY > 300) {
                setTimeout(() => {
                    this.loadingItem = false;
                }, 200)
            }
        },
        handleAddFavorite(clientId, comicId) {
            this.addFavorite({
                client_id: clientId,
                comic_id: comicId,
            });
        },
        handleRemoveFavorite(clientId, comicId) {
            this.removeFavorite({
                client_id: clientId,
                comic_id: comicId,
            });
        },
        handleAddFollow(clientId, comicId) {
            this.addFollow({
                client_id: clientId,
                comic_id: comicId,
            });
        },
        handleRemoveFollow(clientId, comicId) {
            this.removeFollow({
                client_id: clientId,
                comic_id: comicId,
            });
        },
    },
    watch: {
        "$route.params.slug"(newValue) {
            if(newValue) {
                this.loading = true;
                this.loadingItem = true; 
                this.callActionGetDetail(newValue);
            }
        },
    },
    beforeRouteLeave(to, from, next) {
        this.loading = true;
        this.loadingItem = true; 
        next();
    }
};
</script>