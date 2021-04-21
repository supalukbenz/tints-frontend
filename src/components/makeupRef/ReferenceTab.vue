<template>
  <div>
    <div class="filter-container">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Price
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" @click="lowToHeightOption" type="button">
            Low to Height
          </button>
          <button class="dropdown-item" @click="heightToLowOption" type="button">
            Hight to Low
          </button>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
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

    <div class="tab-content" v-if="getMakeupByImageRef">
      <div class="tab-pane lips-pane" :class="[skinActive ? 'active' : 'd-none']">
        <div v-for="(item, index) in skinList" :key="index">
          <ItemCard :skinState="true" :item="item"></ItemCard>
        </div>
      </div>
      <div class="tab-pane" :class="[cheekActive ? 'active' : 'd-none']">
        <div v-for="(item, index) in blushList" :key="index">
          <ItemCard :blushState="true" :item="item"></ItemCard>
        </div>
      </div>
      <div class="tab-pane" :class="[lipsActive ? 'active' : 'd-none']">
        <div v-for="(item, index) in lipsList" :key="index">
          <ItemCard :lipState="true" :item="item"></ItemCard>
        </div>
      </div>
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
      lipsActive: false,
      cheekActive: false,
      skinActive: true,
      lipstickList: [],
      sortedBlush: [],
      sortedLips: [],
      sortedSkin: [],
    };
  },
  computed: {
    ...mapGetters(['getMakeupByImageRef']),
    skinList() {
      if (this.sortedSkin.length !== 0) {
        return this.sortedSkin;
      } else {
        return this.getMakeupByImageRef.Foundation;
      }
    },
    blushList() {
      if (this.sortedBlush.length !== 0) {
        return this.sortedBlush;
      } else {
        return this.getMakeupByImageRef.Blush;
      }
    },
    lipsList() {
      if (this.sortedLips.length !== 0) {
        return this.sortedLips;
      } else {
        return this.getMakeupByImageRef.Lipstick;
      }
    },
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
    lowToHeightOption() {
      let makeupList = this.getMakeupByImageRef;
      if (this.skinActive) {
        this.sortedSkin = makeupList.Foundation.sort((a, b) => a.price - b.price);
      }
      if (this.cheekActive) {
        this.sortedBlush = makeupList.Blush.sort((a, b) => a.price - b.price);
      }
      if (this.lipsActive) {
        this.sortedLips = makeupList.Lipstick.sort((a, b) => a.price - b.price);
      }
    },
    heightToLowOption() {
      const feature = 'heightToLow';
      this.lipstickList = this.getSortedLipstickByPrice(feature);
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

.filter-container {
  display: flex;
  justify-content: flex-end;
}

.tab-pane {
  background: #ffffff;
  border: 1px solid transparent;
  border-color: #ffffff #dee2e6 #dee2e6 #dee2e6;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
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
