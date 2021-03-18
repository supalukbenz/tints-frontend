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
        400: { visibleSlides: 1, slideMultiple: 1 },
      }"
    >
      <vueper-slide v-for="(i, index) in list" :key="index"
        ><template class="content-container" v-slot:content>
          <div class="content-detail">
            <div
              @click="selectedSimulated(i._id, i.rgb_value)"
              class="content-wrapper content-item"
            >
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

export default {
  components: {
    VueperSlides,
    VueperSlide,
    ItemCard,
  },
  props: {
    list: Array,
  },
  data() {
    return {
      likeTest: [],
      simulatedId: '',
      rgbValue: '',
    };
  },
  methods: {
    selectedSimulated(id, rgbValue) {
      this.simulatedId = id;
      this.rgbValue = rgbValue;
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
