<template>
    <div class="row">
        <div class="col-lg-4" v-for="item in comic_favorite" :key="item.id">
            <div class="content-comic-profile">
                <div class="content-item-image">
                    <img v-lazy="item.thumbnail" :alt="item.name">
                </div>
                <div class="content-item-text">
                    <span class="name">{{ item.name }}</span>
                    <span class="icon"><i class="fa fa-heart" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState('client', ['comic_favorite'])
    },
    methods: {
        ...mapActions('client', ['getListFavorite']),
        getList: function() {
            this.getListFavorite();
        } 
    },
    created() {
        this.getList();
    }
}
</script>