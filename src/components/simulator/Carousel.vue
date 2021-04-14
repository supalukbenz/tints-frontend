<template>
  <div class="slide-container">
    <vueper-slides
      class="no-shadow carousel-width"
      :visible-slides="4"
      slide-multiple
      :gap="1"
      :slide-ratio="1 / 4"
      :fixed-height="true"
      :touchable="false"
      :dragging-distance="100"
      :bullets="true"
      :breakpoints="{
        910: { visibleSlides: 3, slideMultiple: 3 },
        650: { visibleSlides: 2, slideMultiple: 2 },
      }"
    >
      <vueper-slide v-for="(i, index) in list" :key="index"
        ><template class="content-container" v-slot:content>
          <div class="content-detail">
            <div @click="selectedSimulated(i)" class="content-wrapper content-item">
              <ItemCard
                class="transition-none"
                :simulatedId="simulatedId"
                :rgbValue="rgbValue"
                :item="i"
                :simulatorState="simulatorState"
              ></ItemCard>
            </div>
            <div class="like-tab">
              <button
                type="button"
                class="like-btn border-red"
                @click="handleItemUnliked(i)"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Unlike"
              >
                <span><i class="like-icon heart-red fas fa-heart"></i></span>
              </button>
            </div></div></template
      ></vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import ItemCard from '@/components/makeupRef/ItemCard.vue';
import 'vueperslides/dist/vueperslides.css';
import { mapGetters } from 'vuex';

export default {
  components: {
    VueperSlides,
    VueperSlide,
    ItemCard,
  },
  props: {
    list: Array,
    lipState: Boolean,
    blushState: Boolean,
    skinState: Boolean,
    cheeckState: Boolean,
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getMakeupSimulator']),
  },
  data() {
    return {
      likeTest: [],
      simulatedId: '',
      rgbValue: '',
      simulatorState: true,
    };
  },
  methods: {
    selectedSimulated(item) {
      this.simulatedId = item._id;
      this.rgbValue = item.rgb_value;
      if (this.lipState) {
        this.$store.dispatch('updateMakeupState', 'Lip');
      }
      if (this.blushState) {
        this.$store.dispatch('updateMakeupState', 'Blush');
      }
      if (this.skinState) {
        this.$store.dispatch('updateMakeupState', 'Foundation');
      }
      this.$store.dispatch('updateMakeupSimulator', item);
    },
    indexLiked(item) {
      if (this.lipState) {
        const index = this.getUserInfo.likedLip.findIndex(
          l => l._id === item._id && l.rgb_value === item.rgb_value
        );
        return index;
      }
    },
    removeItem(user, index) {
      let userLiked = user;
      if (index !== -1) {
        userLiked.splice(index, 1);
      }
      return userLiked;
    },
    handleItemUnliked(item) {
      let updateUser = this.getUserInfo;
      let index = this.indexLiked(item);
      if (this.lipState) {
        if (index !== -1) {
          updateUser.likedLip.splice(index, 1);
        }
      }
      if (this.blushState) {
        if (index !== -1) {
          updateUser.likedBlush.splice(index, 1);
        }
      }
      if (this.skinState) {
        if (index !== -1) {
          updateUser.likedFoundation.splice(index, 1);
        }
      }
      this.$store.dispatch('updateUserProfile', updateUser);
    },
  },
  watch: {
    getMakeupSimulator: {
      async handler(val) {
        if (!val) {
          this.simulatedId = '';
          this.rgbValue = '';
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.slide-container {
  justify-content: center;
  display: flex;
}

.transition-none:hover {
  transition: none;
  /* box-shadow: none; */
}
.vueperslides--fixed-height {
  /* height: calc(70vmin * 9 / 16); */
  height: 24rem;
}

.carousel-width {
  width: 90%;
}

.content-item {
  width: fit-content;
  cursor: pointer;
  height: 20rem;
}

.content {
  max-height: 100%;
}

.content-detail {
  display: flex;
  justify-content: center;
}
.like-tab {
  margin-left: -2.5rem;
  margin-bottom: 1rem;
  z-index: 2;
  width: 1rem;
  display: flex;
  align-items: flex-end;
}

@media screen and (max-width: 720px) {
  .vueperslides--fixed-height {
    height: 18rem;
  }
  .content-item {
    height: 18rem;
  }
}

@media screen and (max-width: 556px) {
  .vueperslides--fixed-height {
    height: 18rem;
  }
  .content-item {
    height: 18rem;
  }
  .carousel-width {
    width: 80%;
  }

  .like-btn {
    width: 1.2rem;
    height: 1.2rem;
  }
  .like-icon {
    font-size: 0.7rem;
  }
}
</style>
