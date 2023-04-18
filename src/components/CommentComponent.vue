<template>
    <div class="anime__details__review">
        <div class="section-title">
            <h5>Reviews</h5>
        </div>
        <div class="anime__review__item" v-for="item in comments" :key="item">
            <div class="anime__review__item__pic">
                <img :src="`${BASE_URL}/img/anime/review-1.jpg`" alt="" />
            </div>
            <div class="anime__review__item__text" >
                <h6>Name - <span>1 Hour ago</span></h6>
                <p>
                    {{ item.message }}
                </p>
            </div>
        </div>
    </div>
    <div class="anime__details__form">
        <div class="section-title">
            <h5>Your Comment</h5>
        </div>
        <form @submit.prevent="handleChat">
            <textarea placeholder="Your Comment" v-model="message"></textarea>
            <button type="submit">
                <i class="fa fa-location-arrow"></i> Review
            </button>
        </form>
    </div> 
</template>

<script>
import axios from 'axios';
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: `http://localhost:8000/broadcasting/auth`,
    key: 'a085fab3ad6d32b3513b',
    cluster: 'ap1',
    forceTLS: true,
    auth: {
        headers: {
            Authorization: 'Bearer ' + 'fdc281f7ce1e6d10749736b8bdc0dff0daf4369ed16e626f140f36ddaf6709ac'
        },
    },
});


export default {
    name: 'CommentComponent',
    data(){
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            comments: {},
            message: '',
        }
    },
    methods: {
        getData: function() {
            axios.get(`${this.API_URL}/comment/get-list`)
            .then(response => {
                const comments = response.data.data.comments

                this.comments = comments;
            })
            .catch(error => {
                console.log(error)
            })
        },
        handleChat: function() {
            let data = {
                client_id: 1,
                comic_id: 1,
                message: this.message,
            }
            axios.post(`${this.API_URL}/comment`, data)
            .then((response) => {
                window.Echo
                .join('chat')
                .whisper('CommentEvent', response.data.data.comment);
            }).catch((error) => {
                console.log(error);
            })
        },
        chat: function() {
            window.Echo.private('chat')
            .listen('CommentEvent', (e) => {
                console.log(e)
            });
        },
    },
    created() {
        this.getData()
        this.chat();
    },
    mounted() {
       
    }
}
</script>