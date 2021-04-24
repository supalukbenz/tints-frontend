<template>
  <div class="like-container">
    <div>
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
  font-weight: 700;
  margin-bottom: 0.5rem;
  border: 3px solid #333333;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  background: rgba(237, 176, 146, 0.4);
  padding: 0.5rem;
  margin-bottom: 2rem;
  color: #000000;
  position: relative;

  &::before {
    content: '';
    border: 2px solid #353535;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
  }
}
</style>
