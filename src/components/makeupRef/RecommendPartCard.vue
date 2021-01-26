<template>
  <div class="reccommend-card">
    <div class="tab-reccommend">
      <div class="star-icon"><img class="icon-card" src="@/assets/images/star.png" /></div>
    </div>
    <div class="ref-part-container">
      <div>
        <img
          class="img-ref"
          :src="
            lipstickList.length > 0
              ? lipstickList[0].image_link
              : 'https://www.clinique.com/media/export/cms/products/181x209/clq_749K01_181x209.png'
          "
        />
      </div>
      <div class="ref-part-detail">
        <div class="brand-name">
          {{ lipstickList.length > 0 ? lipstickList[0].brand : 'clinique' }}
        </div>
        <div class="color-name">
          {{ lipstickList.length > 0 ? lipstickList[0].color_name : 'Supreme Sorbet' }}
        </div>
        <div class="price">
          ฿{{
            lipstickList.length > 0
              ? converterUSDToTHB(lipstickList[0].price)
              : converterUSDToTHB('17.5')
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ lipstickList: 'getSortedLipstickList' }),
  },
  methods: {
    converterUSDToTHB(usd) {
      return Math.round(Number(usd) * 29.98);
    },
  },
};
</script>

<style lang="scss" scoped>
.reccommend-card {
  width: 100%;
  border-radius: 1rem;
  margin: 1rem 0;
  height: 15rem;
  box-shadow: 0 1.25em 1em -0.5em #0005;
  transition: transform 0.5s;
  background: #ffffff;
  &:hover {
    transform: scale(1.02);
  }
}

.icon-card {
  width: auto;
  height: 3rem;
}

.star-icon {
  margin-top: -1rem;
}
.ref-part-container {
  display: flex;
  justify-content: space-between;
}

.img-ref {
  max-width: 100%;
  height: 13rem;
  margin: 0.5rem;
  margin-top: -1rem;
}

.ref-part-detail {
  padding: 1rem 2rem;
  width: 60%;
  border-radius: 1rem;
  text-align: left;
  // background: rgba(189, 168, 158, 0.65);
}

.brand-name {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: #222222;
  letter-spacing: 2px;
}

.price {
  font-size: 2rem;
  margin-top: 2rem;
}

@media screen and (max-width: 892px) {
  .ref-part-container {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .img-ref {
    max-width: 100%;
    height: 7rem;
    margin: 0;
  }
  .ref-part-detail {
    padding: 0;
    width: 60%;
    border-radius: 1rem;
    text-align: left;
    // background: rgba(189, 168, 158, 0.65);
  }
  .brand-name {
    font-weight: 800;
    font-size: 0.8rem;
    color: #222222;
    letter-spacing: 2px;
  }
  .color-name {
    font-size: 0.7rem;
  }
  .price {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
}

.tab-reccommend {
  width: 100%;
  text-align: right;
}

.star-icon {
  margin-right: 0.5rem;
}
</style>
