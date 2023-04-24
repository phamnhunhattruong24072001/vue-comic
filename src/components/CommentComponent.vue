<template>
    <div class="anime__details__form">
        <div class="section-title">
            <h5>Your Comment</h5>
        </div>
        <form v-if="checkLogin" @submit.prevent="handleChat">
            <textarea placeholder="Your Comment" v-model="messageValue"></textarea>
            <button type="submit">
                <i class="fa fa-location-arrow"></i> Review
            </button>
        </form>
        <div v-else>
            <div class="alert alert-danger" role="alert">
                Bạn cần đăng nhập để bình luận, <router-link :to="{name: 'login'}">Đăng nhập tại đây</router-link>
            </div>
        </div>
    </div> 
    <div class="anime__details__review mt-5">
        <div class="section-title">
            <h5>Reviews</h5>
        </div>
        <div v-if="comments.length > 0">
            <div class="anime__review__item" v-for="item in comments" :key="item.id">
                <div class="anime__review__item__pic">
                    <img :src="item.avatar" alt="" />
                </div>
                <div class="anime__review__item__text" >
                    <h6 :class="checkLogin && item.client.id == userLogin.id ? 'text-danger' : ''">{{ item.client.name }} - <span>{{ item.created_at }}</span></h6>
                    <p>
                        {{ item.message }}
                    </p>
                </div>
            </div>
            <div class="pagination">
                <paginate :page-count="lastPage" :click-handler="handlePaginate" :prev-text="'<<'" :next-text="'>>'"
                      :container-class="'product__pagination'">
                </paginate>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-primary" role="alert">
                Không có bình luận nào
            </div>
        </div>
    </div>
</template>


<script>
import Pusher from 'pusher-js'
import { mapActions, mapState }  from 'vuex';

export default {
    name: 'CommentComponent',
    props: {
        comic_id: {
            type: Number,
        }
    },
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            messageValue: '',
        }
    },
    computed: {
        ...mapState('comment', [
            'comments' ,
            'thisPage',
            'lastPage',
            'message',
            'checkLogin',
            'userLogin'
        ]),
    },
    methods: {
        ...mapActions('comment', ['getData', 'addData', 'addDataComment']),
        getDataView: function(page = 1) {
            this.getData({ comicId: this.comic_id, page});
        },
        handleChat: function() 
        {
            let formData = {
                client_id: this.userLogin.id,
                comic_id: this.comic_id,
                message: this.messageValue,
            }
            this.addData(formData)
            .then(() => {
                this.messageValue = '';
            })
        },
        handleComment: function(comment = {}) 
        {
            this.addDataComment(comment);
        },
        handlePaginate: function(pageNum) 
        {
            this.getDataView(pageNum);
        }
    },
    created() {
        this.getDataView();
    },
    mounted() {
        Pusher.logToConsole = true;

        let pusher = new Pusher(process.env.VUE_APP_MIX_PUSHER_APP_KEY, {
            cluster: 'ap1'
        });
        let channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            this.handleComment(data.comment)
        });
    }
}
</script>