<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a
          class="nav-link lips-link"
          :class="{ active: simulatorActive }"
          @click="handlSimuColActive"
          >Simulator collection</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: likedActive }" @click="handleLikedActive">Liked </a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane lips-pane" :class="[simulatorActive ? 'active' : 'd-none']">
        <Carousel></Carousel>
      </div>
      <div class="tab-pane" :class="[likedActive ? 'active' : 'd-none']">
        <LikedTab></LikedTab>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/simulator/Carousel.vue';
import LikedTab from '@/components/simulator/LikedTab.vue';

export default {
  components: {
    Carousel,
    LikedTab,
  },
  data() {
    return {
      simulatorActive: false,
      likedActive: true,
    };
  },
  methods: {
    handlSimuColActive() {
      this.simulatorActive = true;
      this.likedActive = false;
    },
    handleLikedActive() {
      this.simulatorActive = false;
      this.likedActive = true;
    },
  },
};
</script>

<style scoped>
a.nav-link {
  cursor: pointer;
  color: #222;
  font-size: 1.1rem;
}

.tab-pane {
  background: #ffffff;
  border: 1px solid transparent;
  border-color: #ffffff #dee2e6 #dee2e6 #dee2e6;
  padding: 2rem 1rem;
}
</style>
