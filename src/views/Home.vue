<template>
  <div class="home">
    <Navbar></Navbar>    
    <div class="home-container">
      <MakeupByRefCard></MakeupByRefCard>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/main/Navbar.vue';
import Footer from '@/components/main/Footer.vue';
import MakeupByRefCard from '@/components/homepage/MakeupByRefCard.vue';

export default {
  components: {
    Navbar,
    Footer,
    MakeupByRefCard,
  },
};
</script>
