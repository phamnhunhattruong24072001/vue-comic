<template>
   <!-- Signup Section Begin -->
   <section class="signup spad">
       <div class="container">
           <div class="row">
               <div class="col-lg-6">
                   <div class="login__form">
                       <h3>Sign Up</h3>
                       <form @submit.prevent="handleSubmit()">
                           <div class="input__item">
                               <input type="email" placeholder="Email address" v-model="form.email" />
                               <span class="icon_mail"></span>
                           </div>
                           <div class="input__item">
                               <input type="text" placeholder="Username" v-model="form.username" />
                               <span class="icon_user"></span>
                           </div>
                           <div class="input__item">
                               <input type="text" placeholder="Your Name" v-model="form.name" />
                               <span class="icon_profile"></span>
                           </div>
                           <div class="input__item">
                               <input type="password" placeholder="Password" v-model="form.password" />
                               <span class="icon_lock"></span>
                           </div>
                           <button type="submit" class="site-btn">Login Now</button>
                       </form>
                       <h5>
                           Already have an account?
                           <router-link :to="{ name: 'login' }">Log In!</router-link>
                       </h5>
                   </div>
               </div>
               <div class="col-lg-6">
                   <div class="login__social__links">
                       <h3>Login With:</h3>
                       <ul>
                           <li>
                               <a href="#" class="facebook"><i class="fa fa-facebook"></i> Sign in With Facebook</a>
                           </li>
                           <li>
                               <a href="#" class="google"><i class="fa fa-google"></i> Sign in With Google</a>
                           </li>
                           <li>
                               <a href="#" class="twitter"><i class="fa fa-twitter"></i> Sign in With Twitter</a>
                           </li>
                       </ul>
                   </div>
               </div>
           </div>
       </div>
   </section>
   <!-- Signup Section End -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "RegisterView",
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            form : {
                name: "",
                username: "",
                email: "",
                password: "",
            }
        };
    },
    methods: {
        ...mapActions('auth', ['login']),
        handleSubmit: function() {
            this.register(this.form)
        },
    },
};
</script>