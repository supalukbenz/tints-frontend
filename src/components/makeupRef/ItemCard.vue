<template>
  <div
    v-if="item"
    class="item-container"
    :class="{ 'simulated-border': simulatedId === item._id && rgbValue === item.rgb_value }"
  >
    <div v-if="recommendState" class="star-card">
      <img class="star-icon" src="@/assets/images/makeupRef/star.png" alt="Star" />
    </div>
    <div class="item-body">
      <div class="item-img">
        <img
          class="img-item"
          :src="item.api_image_link ? splitImageURL(item.api_image_link) : item.image_link"
          @error="$event.target.src = item.image_link"
        />
      </div>
      <div class="item-detail">
        <div class="d-flex align-items-center">
          <div class="brand-name">
            {{ item.brand }}
          </div>
        </div>
        <div class="serie-name">
          {{ item.serie }}
        </div>
        <div class="color-name">
          Color: {{ item.color_name }}
          <i
            :style="{ color: 'rgb' + item.rgb_value + ' !important' }"
            class="fas fa-circle ml-1"
          ></i>
        </div>
        <div v-if="item.price > 0" class="price">฿{{ converterUSDToTHB(item.price) }}</div>
      </div>
    </div>
    <div class="item-feature" v-show="!simulatorState">
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
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserInformation } from '@/api/authentication';
import {
  userLikedFoundation,
  userLikedBlush,
  userLikedLipsticks,
  userUnlikedLipsticks,
  userUnlikedBlush,
  userUnlikedFoundation,
} from '@/api/userFeatures';

export default {
  data() {
    return {
      liked: false,
      simulated: false,
    };
  },
  props: {
    item: Object,
    recommendState: Boolean,
    simulatedId: String,
    rgbValue: String,
    simulatorState: Boolean,
    skinState: Boolean,
    blushState: Boolean,
    lipState: Boolean,
    analysisState: Boolean,
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
    imageUrlAlt(e) {
      e.target.src = '@/assets/images/lipstick_plane.png';
    },
    async updateStageUser() {
      const updateUser = await getUserInformation();
      await this.$store.dispatch('updateUserInfo', updateUser);
    },
    async pushLikedItem(index, item) {
      if (this.liked) {
        if (index === -1) {
          if (this.lipState) {
            await userLikedLipsticks(item);
            // updateUser.likedLip.push(item);
          }
          if (this.blushState) {
            await userLikedBlush(item);
            // updateUser.likedBlush.push(item);
          }
          if (this.skinState) {
            await userLikedFoundation(item);
            // updateUser.likedFoundation.push(item);
          }
          await this.updateStageUser();
        }
      } else {
        if (index !== -1) {
          if (this.lipState) {
            console.log('unlike');
            await userUnlikedLipsticks(item);
            // updateUser.likedLip.splice(index, 1);
          }
          if (this.blushState) {
            await userUnlikedBlush(item);
            // updateUser.likedBlush.splice(index, 1);
          }
          if (this.skinState) {
            await userUnlikedFoundation(item);
            // updateUser.likedFoundation.splice(index, 1);
          }
          await this.updateStageUser();
        }
      }
    },
    handleItemLiked() {
      this.liked = !this.liked;
      const index = this.indexLiked;
      this.pushLikedItem(index, this.item);
    },
    splitImageURL(url) {
      if (url.includes('//s3.amazonaws.com')) {
        return 'http://' + url.substring(2, url.length - 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}
.item-detail {
  text-align: left;
  padding: 0.5rem;
  padding-bottom: 0;
}

.simulated-border {
  border: 4px solid #7fd1ae !important;
}

.item-container {
  border: 4px solid transparent;
  width: 11rem;
  height: 100%;
  padding: 0.5rem;
  background: #ffffff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 1.25em 1em -0.5em #0005;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    -ms-transition: all 0.5s;
  }
}

.item-body {
  width: 100%;
}

.img-item {
  height: 9rem;
  max-width: 100%;
}

.brand-name {
  font-weight: 800;
  text-transform: uppercase;
}

.serie-name {
  font-weight: 700;
  font-size: 0.7rem;
}

.color-name {
  font-size: 0.7rem;
  color: #7b7b7b;
  margin: 0.5rem 0;
}

.price {
  font-size: 0.8rem;
  font-weight: 600;
}

.item-feature {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: flex-end;
}

.star-card {
  width: 0.5rem;
  position: absolute;
}

.star-icon {
  width: auto;
  height: 2rem;
}

@media screen and (max-width: 556px) {
  .item-container {
    width: 8rem;
    padding: 0.2rem;
  }
  .img-item {
    height: 6rem;
  }
  .brand-name {
    font-size: 0.9rem;
  }
  .serie-name {
    font-size: 0.7rem;
  }
  .price {
    font-size: 0.7rem;
  }
  .color-name {
    font-size: 0.6rem;
  }
}
</style>
