<template>
  <div class="home">
    <Banner></Banner>
    <div class="home-container">
      <MakeupByRefCard></MakeupByRefCard>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import MakeupByRefCard from '@/components/homepage/MakeupByRefCard.vue';

export default {
  components: {
    Banner,
    MakeupByRefCard,
  },
};
</script>
