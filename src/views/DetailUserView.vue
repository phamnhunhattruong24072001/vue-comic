<template>
   <div class="spad">
       <h1>Chao</h1>
       {{ userId }}
   </div>
</template>

<script>
  export default {
    data(){
      return{
        userId: null,
      }
    },
    mounted(){
        this.userId = this.$route.params.id
    }
  }
</script>