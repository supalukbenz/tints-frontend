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
      :dragging-distance="200"
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
              ></ItemCard>
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
    cheeckState: Boolean,
  },
  computed: {
    ...mapGetters(['getLipSimulatorDetail']),
  },
  data() {
    return {
      likeTest: [],
      simulatedId: '',
      rgbValue: '',
    };
  },
  methods: {
    selectedSimulated(item) {
      this.simulatedId = item._id;
      this.rgbValue = item.rgb_value;
      if (this.lipState) {
        this.$store.dispatch('updateLipSimulator', item);
      }
    },
  },
  watch: {
    getLipSimulatorDetail: {
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
  height: 22rem;
}

.carousel-width {
  width: 90%;
}

.content-item {
  width: fit-content;
  cursor: pointer;
}

.content {
  max-height: 100%;
}

.content-detail {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 720px) {
  .vueperslides--fixed-height {
    height: 20rem;
  }
}

@media screen and (max-width: 556px) {
  .vueperslides--fixed-height {
    height: 18rem;
  }
}
</style>
