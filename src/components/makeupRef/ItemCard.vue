<template>
  <div
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
          :src="
            item
              ? splitImageURL(item.api_image_link)
              : 'https://www.clinique.com/media/export/cms/products/181x209/clq_749K01_181x209.png'
          "
          @error="$event.target.src = 'https://img.icons8.com/ios/452/lipstick.png'"
        />
      </div>
      <div class="item-detail">
        <div class="d-flex align-items-center">
          <div class="brand-name">
            {{ item ? item.brand : 'clinique' }}
          </div>
        </div>
        <div class="serie-name">
          {{ item ? item.serie : 'Dior Addict' }}
        </div>
        <div class="color-name">
          Color: {{ item ? item.color_name : 'Supreme Sorbet' }}
          <i
            :style="[item ? { color: 'rgb' + item.rgb_value + ' !important' } : { color: '#222' }]"
            class="fas fa-circle ml-1"
          ></i>
        </div>
        <div v-if="item.price > 0" class="price">
          ฿{{ item ? converterUSDToTHB(item.price) : converterUSDToTHB('17.5') }}
        </div>
      </div>
    </div>
    <div class="item-feature">
      <button
        type="button"
        class="like-btn"
        :class="[liked ? 'border-red' : 'border-gray']"
        @click="handleItemLiked"
      >
        <span v-show="liked"><i class="like-icon heart-red fas fa-heart"></i></span>
        <span v-show="!liked"><i class="like-icon heart-gray far fa-heart"></i></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
  },
  computed: {
    ...mapGetters({ user: 'getUserInfo' }),
  },
  methods: {
    converterUSDToTHB(usd) {
      return Math.round(Number(usd) * 29.98);
    },
    imageUrlAlt(e) {
      e.target.src = '@/assets/images/lipstick_plane.png';
    },
    pushLikedItem(index, list, item) {
      if (this.liked) {
        if (index === -1) {
          list.push(item);
        }
      } else {
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    },
    handleItemLiked() {
      this.liked = !this.liked;
      const itemId = this.item._id;
      const index = this.user.likedLip.findIndex(id => id === itemId);
      this.pushLikedItem(index, this.user.likedLip, itemId);
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

.like-btn {
  // margin: 1rem !important;
}

@media screen and (max-width: 556px) {
  .item-container {
    width: 9.5rem;
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
