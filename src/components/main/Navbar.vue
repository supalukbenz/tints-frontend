<template>
  <div>
    <div class="nav-container d-flex justify-content-between">
      <router-link to="/" class="home-btn">
        <span>
          tints.
        </span>
      </router-link>
      <button class="user-btn" type="button">
        <img
          class="user-img"
          :src="require(`@/assets/images/mockup/${userProfile.userImage}`)"
          alt="User"
        />
      </button>
    </div>
    <!-- <img class="nav-bg" src="@/assets/images/nav_img.png" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfile: {
        username: 'anyataylor',
        userEmail: 'anya@gmail.com',
        userImage: 'user.jpg',
      },
    };
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

.home-btn:hover {
  text-decoration: none;
}

.nav-bg {
  width: 100%;
  margin-top: -0.25rem;
}

.user-img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.user-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  padding: 0;
  border: none;
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
