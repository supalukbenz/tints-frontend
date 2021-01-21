<template>
  <div class="home">
    <Banner></Banner>
    <div class="home-container">
      <MakeupByRefCard></MakeupByRefCard>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import Footer from '@/components/main/Footer.vue';
import MakeupByRefCard from '@/components/homepage/MakeupByRefCard.vue';

export default {
  components: {
    Banner,
    Footer,
    MakeupByRefCard,
  },
};
</script>
