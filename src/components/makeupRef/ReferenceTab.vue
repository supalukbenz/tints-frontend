<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link lips-link" :class="{ active: lipsActive }" @click="handleLipsActive"
          >Lips <img class="icon-tab" src="@/assets/images/lipstick.png"
        /></a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: cheekActive }" @click="handleCheeckActive"
          >Cheeck <img class="icon-tab" src="@/assets/images/blush.png"
        /></a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" :class="{ active: skinActive }" @click="handleSkinActive"
          >Skin <img class="icon-tab" src="@/assets/images/foundation.png"
        /></a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane lips-pane" :class="[lipsActive ? 'active' : 'd-none']">
        <div v-for="(item, index) in getSortedLipstickList" :key="index">
          <ItemCard :item="item"></ItemCard>
        </div>
      </div>
      <div class="tab-pane" :class="[cheekActive ? 'active' : 'd-none']"></div>
      <div class="tab-pane" :class="[skinActive ? 'active' : 'd-none']"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ItemCard from '@/components/makeupRef/ItemCard.vue';

export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      lipsActive: true,
      cheekActive: false,
      skinActive: false,
    };
  },
  computed: {
    ...mapGetters(['getSortedLipstickList']),
  },
  methods: {
    handleLipsActive() {
      this.lipsActive = true;
      this.cheekActive = false;
      this.skinActive = false;
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
  },
};
</script>

<style lang="scss" scoped>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  justify-items: center;
  grid-gap: 2.5rem 0.5rem;
}

.icon-tab {
  width: 1rem;
}

@media screen and (max-width: 390px) {
  .tab-pane {
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  }
}
</style>
