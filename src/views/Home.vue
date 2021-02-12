<template>
  <div class="home">
    <Banner bannerImg="homepage_banner.png"></Banner>
    <div class="home-container">
      <MakeupByRefCard></MakeupByRefCard>
      <SimulatorCard></SimulatorCard>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import MakeupByRefCard from '@/components/homepage/MakeupByRefCard.vue';
import SimulatorCard from '@/components/homepage/SimulatorCard.vue';

export default {
  components: {
    Banner,
    MakeupByRefCard,
    SimulatorCard,
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding: 2rem 0;
}
</style>
