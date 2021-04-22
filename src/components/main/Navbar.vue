<template>
  <div>
    <div class="nav-container d-flex justify-content-between">
      <router-link to="/" class="home-btn">
        <span>
          tints.
        </span>
      </router-link>
      <div class="dropdown">
        <button
          class="user-btn"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            class="user-img"
            :src="convertBase64Image(getUserInfo.base64_user_image)"
            alt="User"
          />
        </button>

        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <router-link class="dropdown-item user-item" to="/user-profile">Edit profile</router-link>
          <a class="dropdown-item user-item" @click="handleLogout" href="#">Logout</a>
          <a class="dropdown-item user-item" href="#">Something else here</a>
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
    handleLogout() {
      localStorage.clear();
      this.$router.push('/').catch(() => {});
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0;
  border: none;
  outline: none;
}

@media screen and (max-width: 892px) {
  .user-btn {
    width: 3rem;
    height: 3rem;
  }

  .user-img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
