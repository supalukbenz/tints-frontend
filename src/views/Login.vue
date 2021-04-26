<template>
  <div>
    <Banner bannerImg="user_feature-banner.png"></Banner>
    <LoadingStage v-show="loadingLoginStage" title="Loading">
      <LoadingSimulation></LoadingSimulation>
    </LoadingStage>
    <div class="login-bg">
      <div class="login-container flex-center">
        <div class="wrapper">
          <div class="login-banner flex-center">
            <div class="welcome-txt">Welcome!</div>
            <router-link to="/register" type="button" class="register-btn form-btn"
              >Sign up</router-link
            >
          </div>
          <div class="login-form flex-center">
            <div>
              <div class="login-title">Member Login</div>
              <div class="input-form">
                <div class="email-title title-form">Email</div>
                <input
                  type="email"
                  :class="{ borderRed: clickedLoginState && email === '' }"
                  class="email-form form-input"
                  v-model="email"
                />
              </div>
              <div class="input-form">
                <div class="password-title title-form">Password</div>
                <input
                  type="password"
                  :class="{ borderRed: clickedLoginState && password === '' }"
                  class="password-form form-input"
                  v-model="password"
                />
              </div>
            </div>
            <div v-show="loginErrorState" class="alert-error">* Incorrect email or password</div>
            <div>
              <button @click="handleLogin" type="button" class="login-btn form-btn">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import LoadingSimulation from '@/components/simulator/LoadingSimulation.vue';
import LoadingStage from '@/components/main/LoadingStage.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  components: {
    Banner,
    LoadingStage,
    LoadingSimulation,
  },
  data() {
    return {
      email: '',
      password: '',
      loginErrorState: false,
      clickedLoginState: false,
      loadingLoginStage: false,
    };
  },
  computed: {
    ...mapGetters({ token: 'getUserToken', user: 'getUserDetail' }),
  },
  beforeUpdate() {
    this.$store.dispatch('updateRegisterState', 1);
  },
  methods: {
    async handleLogin() {
      this.clickedLoginState = true;
      if (this.email !== '' && this.password !== '') {
        this.loadingLoginStage = true;
        this.loginErrorState = false;
        const form = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch('loadUserInfo', form);
          await this.$store.dispatch('updateUserToken', this.user.token);
          this.loadingLoginStage = false;
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          this.$router.go(this.$router.currentRoute);
          this.$router.push('/');
          this.$router.go(this.$router.currentRoute);
        } catch (err) {
          this.loginErrorState = true;
          this.loadingLoginStage = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input,
button {
  outline: none;
}

.alert-error {
  font-size: 0.8rem;
  font-weight: 800;
  color: #a83f39;
}

.borderRed {
  border-color: #a83f39 !important;
}

// .login-bg {
//   background-image: url('../assets/images/banner/fabric_bg.jpg');
//   -webkit-background-size: cover;
//   -moz-background-size: cover;
//   -o-background-size: cover;
//   background-size: cover;
//   background-attachment: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0px;
//   left: 0px;
//   margin-bottom: -10rem;
// }

.login-container {
  // margin: 2rem 0;
  padding: 5rem 0;
  padding-bottom: 8rem;
}

.wrapper {
  // height: calc(90vmin * 9 / 16);
  height: 30rem;
  display: flex;
  box-shadow: 0 1.25em 1em -0.5em #0005;
  border-radius: 1rem;
}

.welcome-txt {
  font-weight: 700;
  font-size: 1.5rem;
}

.login-title {
  font-size: 2rem;
  color: #edb194;
  font-weight: 700;
  margin-bottom: 2rem;
}

.login-banner {
  background: #edb194;
  color: #ffffff;
  height: 100%;
  width: 40vmin;
  border-radius: 1rem 0 0 1rem;
  flex-direction: column;
}

.login-form {
  height: 100%;
  width: 50vmin;
  background: #fff;
  border-radius: 0 1rem 1rem 0;
  flex-direction: column;
}

.form-btn {
  margin-top: 2rem;
  border: 2px solid transparent;
  border-radius: 20rem;
  font-size: 0.9rem;
  font-weight: 700;
  background: #edb194;
  color: #ffffff;
}

.login-btn {
  padding: 0.4rem 5rem;
}

.register-btn {
  border: 2px solid #ffffff !important;
  background: #edb194;
  padding: 0.2rem 3rem;
}

.form-input {
  border: none;
  border-bottom: 1px solid #2c3e50;
  width: 100%;
}

.input-form {
  margin: 1rem 0;
  font-size: 0.8rem;
}

.title-form {
  text-align: left;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 650px) {
  .input-form {
    margin: 0.5rem 0;
  }

  .form-btn {
    margin-top: 2rem;
    padding: 0.2rem 3rem;
  }
}

@media screen and (max-width: 500px) {
  .form-input {
    width: 11rem;
  }

  .login-title {
    font-size: 1.5rem;
  }

  .welcome-txt {
    font-size: 1.2rem;
  }

  // .form-btn {
  //   margin-top: 1rem;
  // }
}

@media screen and (max-width: 450px) {
  .form-input {
    width: 9rem;
  }

  .form-btn {
    // margin-top: 1.5rem;
    font-size: 0.8rem;
  }

  .login-title {
    font-size: 1.3rem;
  }

  .login-btn {
    padding: 0.2rem 3rem;
  }

  .register-btn {
    padding: 0.1rem 2rem;
  }

  .wrapper {
    height: 20rem;
  }
}
</style>
