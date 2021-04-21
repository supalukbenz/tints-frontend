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
          :src="item ? splitImageURL(item.api_image_link) : ''"
          @error="$event.target.src = 'https://img.icons8.com/ios/452/lipstick.png'"
        />
      </div>
      <div class="ref-part-detail">
        <div class="ref-title">
          <div class="brand-name">
            {{ item ? item.brand : 'Dior' }}
          </div>
          <div class="serie-name">
            {{ item ? item.serie : 'Dior Addict Lip Glow' }}
          </div>
        </div>
        <div class="color-name">
          color: {{ item ? item.color_name : '001' }}
          <i
            :style="[
              item
                ? { color: 'rgb' + item.rgb_value + ' !important' }
                : { color: '#222' },
            ]"
            class="fas fa-circle ml-1 circle-icon"
          ></i>
          <!-- <i
            :style="{ color: 'rgb' + rgbColorLips + ' !important' }"
            class="fas fa-circle ml-1 circle-icon"
          ></i> -->
        </div>
        <div class="price">฿{{ item ? converterUSDToTHB(item.price) : '990' }}</div>
      </div>
      <div class="ref-feature">
        <button
          type="button"
          class="like-btn"
          :class="[indexLiked !== -1 ? 'border-red' : 'border-gray']"
          @click="handleItemLiked"
        >
          <span v-show="indexLiked !== -1"><i class="like-icon heart-red fas fa-heart"></i></span>
          <span v-show="indexLiked == -1"><i class="like-icon heart-gray far fa-heart"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      liked: false,
      rgbColorLips: this.rgbColor,
    };
  },
  props: {
    rgbColor: String,
    item: Object,
    skinState: Boolean,
    blushState: Boolean,
    lipState: Boolean,
  },
  computed: {
    ...mapGetters({ user: 'getUserInfo' }),
    indexLiked() {
      let index = null;
      if (this.lipState) {
        index = this.user.likedLip.findIndex(
          l => l._id === this.item._id && l.rgb_value === this.item.rgb_value
        );
      }
      if (this.blushState) {
        index = this.user.likedBlush.findIndex(
          l => l._id === this.item._id && l.rgb_value === this.item.rgb_value
        );
      }
      if (this.skinState) {
        index = this.user.likedFoundation.findIndex(
          l => l._id === this.item._id && l.rgb_value === this.item.rgb_value
        );
      }
      return index;
    },
  },
  methods: {
    converterUSDToTHB(usd) {
      return Math.round(Number(usd) * 29.98);
    },
    checkNotNullArray(arr) {
      return arr.length > 0;
    },
    pushLikedItem(index, item) {
      let updateUser = this.user;
      if (this.liked) {
        if (index === -1) {
          // updateUser.likedLip.push(item);
          if (this.lipState) {
            updateUser.likedLip.push(item);
          }
          if (this.blushState) {
            updateUser.likedBlush.push(item);
          }
          if (this.skinState) {
            console.log('skin');
            updateUser.likedFoundation.push(item);
            console.log(updateUser.likedFoundation);
          }
        }
      } else {
        if (index !== -1) {
          if (this.lipState) {
            updateUser.likedLip.splice(index, 1);
          }
          if (this.blushState) {
            updateUser.likedBlush.splice(index, 1);
          }
          if (this.skinState) {
            updateUser.likedFoundation.splice(index, 1);
          }
        }
      }
      this.$store.dispatch('updateUserProfile', updateUser);
    },
    handleItemLiked() {
      console.log('like');
      this.liked = !this.liked;
      const index = this.indexLiked;
      console.log('liked', this.liked);
      console.log('indexLiked', this.indexLiked);
      this.pushLikedItem(index, this.item);
    },
    splitImageURL(url) {
      return 'http://' + url.substring(2, url.length - 1);
    },
  },
  watch: {
    rgbColor(val) {
      this.rgbColorLips = val;
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
  margin: 0.4rem;
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
  padding: 0.5rem;
}

.brand-name {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.3rem;
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
