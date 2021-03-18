<template>
  <div class="like-container">
    <div class="lip-container">
      <div class="title-liked">Lip</div>
      <Carousel :list="user.likedLip"></Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/simulator/Carousel.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Carousel,
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
