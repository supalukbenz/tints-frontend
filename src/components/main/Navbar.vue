<template>
  <div>
    <div class="nav-container d-flex justify-content-between">
      <router-link to="/" class="home-btn">
        <span>
          tints.
        </span>
      </router-link>
      <button class="user-btn" type="button">
        <img class="user-img" src="@/assets/images/mockup/user.jpg" alt="User" />
      </button>
    </div>
    <!-- <img class="nav-bg" src="@/assets/images/nav_img.png" /> -->
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  height: 5rem;
  align-items: center;
  padding: 0rem 2rem;
  background-color: #ffffff;
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
</style>
