<template>
  <div>
    <div class="nav-container d-flex justify-content-between">
      <router-link to="/" class="home-btn">
        <span>
          tints.
        </span>
      </router-link>
      <div class="dropdown" v-if="JSON.stringify(getUserInfo) !== JSON.stringify({})">
        <button
          class="user-btn"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            v-show="JSON.stringify(getUserInfo) !== JSON.stringify({})"
            class="user-img"
            :src="convertBase64Image(getUserInfo.base64_user_image)"
            alt="User"
          />
        </button>

        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <router-link class="dropdown-item user-item" to="/user-profile">Edit profile</router-link>
          <a class="dropdown-item user-item" @click="handleLogout" href="#">Logout</a>
        </div>
      </div>
    </div>
    <!-- <img class="nav-bg" src="@/assets/images/nav_img.png" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    async handleLogout() {
      await localStorage.clear();
      await this.$store.dispatch('updateUserInfo', {});
      await this.$store.dispatch('updateUserToken', '');
      // if (this.$route.path !== '/') {
      //   this.$router.push('/');
      // }
      this.$router.go(this.$router.currentRoute);
      this.$router.push('/login').catch(() => {});

      // this.$router.push('/');
    },
    convertBase64Image(base64) {
      return `data:image/png;base64, ${base64}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  height: 5rem;
  align-items: center;
  padding: 0rem 2rem;
  padding-left: 4rem;
  background-color: #fffcf7;
}

.home-btn {
  font-family: 'Yeseva One', cursive;
  padding: 0.5rem;
  color: #edb194;
  letter-spacing: 3px;
  font-size: 2rem;
}

.user-item:hover {
  background: #edb194;
  color: #ffffff;
}

.home-btn:hover {
  text-decoration: none;
}

.nav-bg {
  width: 100%;
  margin-top: -0.25rem;
}

.user-img {
  // width: 50px;
  max-height: 50px;
  // border-radius: 50%;
  // overflow: hidden;
}

.user-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #edb194;
  padding: 0;
  border: none;
  outline: none;
  overflow: hidden;
}

@media screen and (max-width: 930px) {
  .nav-container {
    padding-left: 3rem;
  }
}

@media screen and (max-width: 730px) {
  .nav-container {
    padding-left: 2rem;
  }
}

@media screen and (max-width: 496px) {
  .nav-container {
    padding-left: 1rem;
  }
}
</style>
