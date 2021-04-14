<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <!-- <li class="nav-item" role="presentation">
        <a
          class="nav-link lips-link"
          :class="{ active: simulatorActive }"
          @click="handlSimuColActive"
          >Simulator collection</a
        >
      </li> -->
      <!-- <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: likedActive }" @click="handleLikedActive">
          <i class="like-icon heart-red fas fa-heart"></i>
          Liked
        </a>
      </li> -->
      <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: skinActive }" @click="handleSkinActive"
          >Skin <img class="icon-tab" src="@/assets/images/foundation.png"
        /></a>
      </li>

      <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: cheekActive }" @click="handleCheeckActive"
          >Cheeck <img class="icon-tab" src="@/assets/images/blush.png"
        /></a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link lips-link" :class="{ active: lipsActive }" @click="handleLipsActive"
          >Lips <img class="icon-tab" src="@/assets/images/lipstick.png"
        /></a>
      </li>
    </ul>
    <div class="tab-content">
      <!-- <div class="tab-pane lips-pane" :class="[simulatorActive ? 'active' : 'd-none']"></div> -->
      <div class="tab-pane" :class="[skinActive ? 'active' : 'd-none']">
        <LikedTab :skinState="true">Foundation</LikedTab>
      </div>
      <div class="tab-pane" :class="[cheekActive ? 'active' : 'd-none']">
        <LikedTab :blushState="true">Blush</LikedTab>
      </div>
      <div class="tab-pane" :class="[lipsActive ? 'active' : 'd-none']">
        <LikedTab :lipsState="true">Lipstick</LikedTab>
      </div>
    </div>
  </div>
</template>

<script>
import LikedTab from '@/components/simulator/LikedTab.vue';

export default {
  components: {
    LikedTab,
  },
  data() {
    return {
      simulatorActive: false,
      likedActive: true,
      skinActive: true,
      cheekActive: false,
      lipsActive: false,
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
    handleCheeckActive() {
      this.lipsActive = false;
      this.cheekActive = true;
      this.skinActive = false;
    },
    handleSkinActive() {
      this.lipsActive = false;
      this.cheekActive = false;
      this.skinActive = true;
    },
    handleLipsActive() {
      this.lipsActive = true;
      this.cheekActive = false;
      this.skinActive = false;
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

.icon-tab {
  width: 1rem;
}
</style>
