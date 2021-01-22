<template>
  <div>
    <div class="nav-container d-flex">
      <div class="d-flex">
        <router-link to="/" class="home-btn">
          <span>
            tints.
          </span>
        </router-link>
      </div>
    </div>
    <!-- <img class="nav-bg" src="@/assets/images/nav_img.png" /> -->
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  height: 5rem;
  background: #f6aaaf;
  align-items: center;
  padding: 0rem 2rem;
}

.home-btn {
  font-family: 'Yeseva One', cursive;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  letter-spacing: 2px;
  font-size: 2rem;
}

.home-btn:hover {
  text-decoration: none;
}

.nav-bg {
  width: 100%;
  margin-top: -0.25rem;
}
</style>
