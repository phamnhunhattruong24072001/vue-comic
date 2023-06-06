<template>
     <div class="row">
        <div class="col-lg-4" v-for="item in comic_follow" :key="item.id">
            <div class="content-comic-profile">
                <div class="content-item-image">
                    <img src="http://localhost:8000/storage/comics/168136840823.png" alt="">
                </div>
                <div class="content-item-text">
                    <span class="name">Solo Leveling</span>
                    <span class="icon"><i class="fa fa-eye" aria-hidden="true"></i></span>
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
        ...mapState('client', ['comic_follow'])
    },
    methods: {
        ...mapActions('client', ['getListFollow']),
        getList: function() {
            this.getListFollow();
        } 
    },
    created() {
        this.getList();
    }
}
</script>