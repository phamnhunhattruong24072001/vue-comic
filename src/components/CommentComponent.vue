<template>
    <div class="anime__details__form">
        <div class="section-title">
            <h5>Your Comment</h5>
        </div>
        <form v-if="clientLogin" @submit.prevent="handleChat">
            <textarea placeholder="Your Comment" v-model="message"></textarea>
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
                    <h6 :class="clientLogin && item.client.id == clientLogin.id ? 'text-danger' : ''">{{ item.client.name }} - <span>{{ item.created_at }}</span></h6>
                    <p>
                        {{ item.message }}
                    </p>
                </div>
            </div>
            <paginate :page-count="1" :click-handler="handlePaginate" :prev-text="'Prev'" :next-text="'Next'"
                      :container-class="'product__pagination'">
            </paginate>
        </div>
        <div v-else>
            <div class="alert alert-primary" role="alert">
                Không có bình luận nào
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Pusher from 'pusher-js'
import moment from "moment";

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
            comments: {},
            message: '',
            clientLogin: {},
        }
    },
    methods: {
        getData: function() {
            axios.get(`${this.API_URL}/comment/get-list/${this.comic_id}`)
                .then(response => {
                    const comments = response.data.data.comments.data

                    comments.forEach((comment) => {
                        comment.created_at = moment(comment.created_at).locale("vi").fromNow(true);
                        comment.avatar = this.formatImage(comment.avatar)
                    });
                    this.comments = comments;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        handleChat: function() {
            let data = {
                client_id: this.clientLogin.id,
                comic_id: this.comic_id,
                message: this.message,
                _token: localStorage.getItem('access_token'),
            }
            axios.post(`${this.API_URL}/comment`, data)
                .then((response) => {
                    console.log(response.status);
                    this.message = '';
                }).catch((error) => {
                    console.log(error);
                })
        },
        handleComment: function(comment = {}) {
            comment.created_at = moment(comment.created_at).locale("vi").fromNow(true);
            comment.avatar = this.formatImage(comment.avatar)
            const newComment = [].concat(comment, this.comments);
            this.comments = newComment;
        },
        formatImage: function(image){
            if(!image) {
                image = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';
            }else{
                image = this.API_URL_IMAGE+image
            }
            return image;
        },
        handlePaginate: function(pageNum) {
            console.log(pageNum);
        }
    },
    created() {
        this.getData();
    },
    mounted() {
        if(localStorage.getItem('user')){
            this.clientLogin = JSON.parse(localStorage.getItem('user'))
        }
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