<template>
  <div class="home">
    <Banner bannerImg="homepage_banner.png"></Banner>
    <div class="home-container">
      <MakeupByRefCard></MakeupByRefCard>
      <SimulatorCard></SimulatorCard>
      <RecommendCard></RecommendCard>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import MakeupByRefCard from '@/components/homepage/MakeupByRefCard.vue';
import SimulatorCard from '@/components/homepage/SimulatorCard.vue';
import RecommendCard from '@/components/homepage/RecommendCard.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  components: {
    Banner,
    MakeupByRefCard,
    SimulatorCard,
    RecommendCard,
  },
  computed: {
    ...mapGetters(['getUserToken']),
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.getUserToken}`;
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding-bottom: 2rem;
  background-color: #fffcf7 !important;
}
</style>
