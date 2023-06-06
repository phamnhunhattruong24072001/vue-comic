<template>
    <!-- Login Section Begin -->
    <section class="login spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login__form">
                        <div class="alert alert-danger" role="alert" v-if="loginError">This is a danger alert—check it out!</div>
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
import { mapActions, mapGetters, mapState } from 'vuex';

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
        };
    },
    computed: {
        ...mapState('auth', ['isLoggingIn', 'loginError']),
        ...mapGetters('auth', ['user']),
    },
    methods: {
        ...mapActions('auth', ['login']),
        handleSubmit: function() {
            this.login(this.form)
        },
    },
    watch: {
        loginError: {
            handler(newV) {
                if(!newV) {
                    location.reload();
                }
            }
        }
    }
};
</script>