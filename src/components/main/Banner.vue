<template>
  <div class="banner-container">
    <img class="banner-bg" :src="require(`@/assets/images/banner/${bannerImg}`)" alt="Banner" />
  </div>
</template>

<script>
export default {
  props: {
    bannerImg: String,
  },
};
</script>

<style scoped>
.banner-container {
  /* background: linear-gradient(
      180deg,
      rgba(224, 93, 111, 0.8337710084033614) 0%,
      rgba(0, 0, 0, 0.542454481792717) 78%
    ),
    url('../../assets/images/tints.png');
  background-position: center, center;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  height: 18rem; */
  /* width: auto; */
  width: 100%;
}

.banner-bg {
  width: 100%;
}
</style>
