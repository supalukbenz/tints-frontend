<template>
  <div class="item-container">
    <div class="item-body">
      <img
        class="img-item"
        :src="
          item
            ? item.image_link
            : 'https://www.clinique.com/media/export/cms/products/181x209/clq_749K01_181x209.png'
        "
        @error="$event.target.src = 'https://img.icons8.com/ios/452/lipstick.png'"
      />
      <div class="item-detail">
        <div class="brand-name">
          {{ item ? item.brand : 'clinique' }}
        </div>
        <div class="color-name">
          {{ item ? item.color_name : 'Supreme Sorbet' }}
        </div>
        <div class="price">
          ฿{{ item ? converterUSDToTHB(item.price) : converterUSDToTHB('17.5') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    converterUSDToTHB(usd) {
      return Math.round(Number(usd) * 29.98);
    },
    imageUrlAlt(e) {
      e.target.src = '@/assets/images/lipstick_plane.png';
    },
  },
};
</script>

<style lang="scss" scoped>
.item-detail {
  text-align: left;
  padding-left: 1.5rem;
  padding-top: 1rem;
}

.item-container {
  width: 12rem;
  background: #ffffff;
  &:hover {
    box-shadow: 0 1.25em 1em -0.5em #0005;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    -ms-transition: all 0.5s;
  }
}

.img-item {
  height: 10rem;
  max-width: 100%;
}

.brand-name {
  font-weight: 800;
  text-transform: uppercase;
}

.color-name {
  font-size: 0.8rem;
}

.price {
  padding: 1rem 0;
}
</style>
