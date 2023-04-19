<template>
    <!-- Login Section Begin -->
    <section class="login spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login__form">
                        <h3>Login</h3>
                        <form @submit.prevent="handleSubmit()">
                            <div class="input__item">
                                <input type="text" placeholder="Username" v-model="form.username">
                                <span class="icon_user"></span>
                            </div>
                            <div class="input__item">
                                <input type="password" placeholder="Password" v-model="form.password">
                                <span class="icon_lock"></span>
                            </div>
                            <button type="submit" class="site-btn">Login Now</button>
                        </form>
                        <a href="#" class="forget_pass">Forgot Your Password?</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="login__register">
                        <h3>Dont’t Have An Account?</h3>
                        <router-link :to="{ name: 'register' }" class="primary-btn">Register Now</router-link>
                    </div>
                </div>
            </div>
            <div class="login__social">
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-6">
                        <div class="login__social__links">
                            <span>or</span>
                            <ul>
                                <li><a href="#" class="facebook"><i class="fa fa-facebook"></i> Sign in With
                                        Facebook</a></li>
                                <li><a href="#" class="google"><i class="fa fa-google"></i> Sign in With Google</a></li>
                                <li><a href="#" class="twitter"><i class="fa fa-twitter"></i> Sign in With Twitter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Login Section End -->
</template>

<script>
import axios from "axios";
export default {
    name: "RegisterView",
    data() {
        return {
            BASE_URL: process.env.VUE_APP_BASE_URL,
            API_URL: process.env.VUE_APP_API_URL,
            API_URL_IMAGE: process.env.VUE_APP_API_URL_IMAGE,
            form: {
                username: "",
                password: "",
            },
            is_login: false
        };
    },
    methods: {
        handleSubmit: function() {
            axios.post(`${this.API_URL}/auth/login`, this.form)
            .then((response) => {
                if (response.status == 200) {
                    // Lưu thông tin user và access token vào local storage
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                    localStorage.setItem('access_token', response.data.data.access_token);
                    localStorage.setItem('token_type', response.data.data.token_type);
                    console.log(response.data.data.access_token);

                    // Điều hướng về trang chủ
                    this.is_login = true;
                    this.$router.push({name: 'home'});
                }
            })
            .catch((error) => {
                console.log(error)
            });
        },

    },
    created() {
        // Kiểm tra xem user đã đăng nhập hay chưa  
        if (localStorage.getItem('user') && localStorage.getItem('access_token')) {
            this.$router.push({name: 'home'});
        }
    },
};
</script>