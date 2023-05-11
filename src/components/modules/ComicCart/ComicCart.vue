<template>
    <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="product__item">
            <router-link :to="{ name: 'detail-comic', params: { slug: item.slug } }" class="product__item__pic set-bg">
                <img v-lazy="item.thumbnail" :alt="item.name" />
                <div class="ep">{{ item.chapter_latest.name }}</div>
                <div class="country" :title="item.country.name">
                    <img v-lazy="item.country.avatar" :alt="item.country.name">
                </div>
                <div class="comment">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    {{ item.chapter_latest.created_at }}
                </div>
                <div class="view">
                    <i class="fa fa-eye"></i> {{ item.view }}
                </div>
            </router-link>
            <div class="product__item__text">
                <h5>
                    <router-link :to="{name: 'detail-comic',params: { slug: item.slug },}">{{ item.name }}</router-link>
                </h5>
                <ul>
                    <li v-for="genre in item.genres" :key="genre.id">
                        {{ genre.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object,
            required: true,
        } 
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
}
</script>