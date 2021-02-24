<template>
  <div class="reccommend-card">
    <div class="ref-part-container">
      <div class="tab-reccommend">
        <div class="star-card">
          <img class="star-icon" src="@/assets/images/makeupRef/star.png" />
        </div>
      </div>
      <div class="img-container">
        <img
          class="img-ref"
          :src="lipstickList ? splitImageURL(lipstickList.api_image_link) : ''"
          @error="$event.target.src = 'https://img.icons8.com/ios/452/lipstick.png'"
        />
      </div>
      <div class="ref-part-detail">
        <div class="ref-title">
          <div class="brand-name">
            {{ lipstickList ? lipstickList.brand : 'Dior' }}
          </div>
          <div class="serie-name">
            {{ lipstickList ? lipstickList.serie : 'Dior Addict Lip Glow' }}
          </div>
        </div>
        <div class="color-name">
          color: {{ lipstickList ? lipstickList.color_name : '001' }}
          <i
            :style="[
              lipstickList
                ? { color: 'rgb' + lipstickList.rgb_value + ' !important' }
                : { color: '#222' },
            ]"
            class="fas fa-circle ml-1 circle-icon"
          ></i>
        </div>
        <div class="price">฿{{ lipstickList ? converterUSDToTHB(lipstickList.price) : '990' }}</div>
      </div>
      <div class="ref-feature">
        <button
          type="button"
          class="like-btn"
          :class="[liked ? 'border-red' : 'border-gray']"
          @click="handleLiked"
        >
          <span v-show="liked"><i class="like-icon heart-red fas fa-heart"></i></span>
          <span v-show="!liked"><i class="like-icon heart-gray far fa-heart"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liked: false,
    };
  },
  props: {
    rgbColor: String,
    lipstickList: Object,
  },
  // computed: {
  //   ...mapGetters({ lipstickList: 'getSortedLipstickList' }),
  // },
  methods: {
    converterUSDToTHB(usd) {
      return Math.round(Number(usd) * 29.98);
    },
    checkNotNullArray(arr) {
      return arr.length > 0;
    },
    handleLiked() {
      this.liked = !this.liked;
    },
    splitImageURL(url) {
      return 'http://' + url.substring(2, url.length - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}

.reccommend-card {
  width: 100%;
  border-radius: 1rem;
  margin: 0.4rem 0;
  height: 12rem;
  box-shadow: 0 1.25em 1em -0.5em #0005;
  transition: transform 0.5s;
  background: #ffffff;
  &:hover {
    transform: scale(1.02);
  }
}

.star-icon {
  width: auto;
  height: 2rem;
}

.ref-part-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-ref {
  max-width: 100%;
  height: 10rem;
  margin: 0.5rem;
}

.ref-part-detail {
  width: 60%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.5rem;
}

.brand-name {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: #222222;
}

.serie-name {
  font-size: 0.8rem;
  font-weight: 700;
}

.color-name {
  color: #7b7b7b;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.price {
  font-weight: 700;
  font-size: 0.9rem;
}

// @media screen and (max-width: 892px) {
//   .ref-part-container {
//     flex-direction: column;
//     align-items: center;
//     height: auto;
//   }
//   .img-ref {
//     max-width: 100%;
//     height: 5rem;
//     margin: 0;
//   }
//   .ref-part-detail {
//     padding: 0;
//     width: 60%;
//     border-radius: 1rem;
//     text-align: left;
//     // background: rgba(189, 168, 158, 0.65);
//   }
//   .brand-name {
//     font-size: 0.8rem;
//   }
//   .serie-name {
//     font-size: 0.5rem;
//   }
//   .color-name {
//     font-size: 0.6rem;
//     margin: 0;
//   }
//   .price {
//     font-size: 0.8rem;
//   }
//   .ref-feature {
//     border: none !important;
//     margin: 0 !important;
//   }
// }
</style>
