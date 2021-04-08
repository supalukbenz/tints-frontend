<template>
  <div class="like-container">
    <div class="lip-container">
      <div class="title-liked"><slot></slot></div>
      <Carousel v-show="skinState" :skinState="skinState" :list="user.likedFoundation"></Carousel>
      <Carousel v-show="blushState" :blushState="blushState" :list="user.likedBlush"></Carousel>
      <Carousel v-show="lipsState" :lipState="lipsState" :list="user.likedLip"></Carousel>
    </div>
    <!-- <div class="lip-container">
      <div class="title-liked">Blush</div>
      <Carousel :blushState="true" :list="user.likedBlush"></Carousel>
    </div> -->
  </div>
</template>

<script>
import Carousel from '@/components/simulator/Carousel.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Carousel,
  },
  props: {
    skinState: Boolean,
    blushState: Boolean,
    lipsState: Boolean,
  },
  computed: {
    ...mapGetters({ user: 'getUserInfo' }),
  },
};
</script>

<style lang="scss" scoped>
.title-liked {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
</style>
