<template>
  <div class="sub-top-detail">
    <div class="img-part">
      <img class="sub-img fadeIn" :src="splitImageURL(item.api_featured_image)" />
    </div>
    <div class="sub-detail">
      <div class="sub-detail-brand">{{ item.brand }}</div>
      <div class="sub-detail-title">{{ item.name }}</div>
      <div class="sub-detail-color">
        Color: {{ item.product_colors[0].colour_name }}
        <i
          class="fas fa-circle ml-1"
          :style="{ color: item.product_colors[0].hex_value + ' !important' }"
        ></i>
      </div>
      <div v-if="item.price > 0" class="sub-price">฿{{ converterUSDToTHB(item.price) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    splitImageURL(url) {
      if (url) {
        return 'http://' + url.substring(2, url.length - 1);
      }
    },
    converterUSDToTHB(price) {
      return Math.round(Number(price) * 29.98);
    },
  },
};
</script>

<style>
.sub-img {
  /* height: 7rem;
  max-width: 100%; */
  height: auto;
  max-width: 6rem;
}
.sub-top-detail {
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  background: #ffffff;
}

.img-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sub-detail-brand {
  font-weight: 600;
  font-size: 1rem;
}

.sub-detail-title {
  font-weight: 600;
  font-size: 0.8rem;
}

.sub-detail-color {
  font-size: 0.7rem;
}

.sub-price {
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

@media screen and (max-width: 800px) {
  .sub-detail-brand {
    font-size: 0.8rem;
  }
  .sub-detail-title {
    font-size: 0.7rem;
  }
  .sub-detail-color {
    font-size: 0.6rem;
  }
  .sub-price {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
}

@media screen and (max-width: 600px) {
  .sub-img {
    height: 6rem;
  }
  .sub-detail-title {
    font-size: 0.6rem;
  }
}

@media screen and (max-width: 502px) {
  .sub-img {
    height: 5rem;
  }
  .sub-detail-brand {
    font-size: 0.7rem;
  }
  .sub-detail-title {
    font-size: 0.6rem;
  }
  .sub-detail-color {
    font-size: 0.5rem;
  }
  .sub-price {
    font-size: 0.6rem;
    margin-top: 0.2rem;
  }
}

@media screen and (max-width: 468px) {
  .sub-top-detail {
    width: 9rem;
  }
}
</style>
