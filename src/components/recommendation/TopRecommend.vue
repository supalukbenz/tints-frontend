<template>
  <div class="top-container" :style="{ background: colorBg }">
    <div class="makeup-detail">
      <img v-if="skinState" class="title-icon" src="@/assets/recommendation/foundation-icon.png" />
      <img v-if="blushState" class="title-icon" src="@/assets/recommendation/blush-icon.png" />
      <img v-if="lipState" class="title-icon" src="@/assets/recommendation/lip-icon.png" />
      <div class="title-makeup">
        <slot></slot>
        <div class="all-makeup-btn">
          <a
            @click="handleModalState"
            class="all-makeup-modal"
            data-toggle="modal"
            :data-target="'#modal' + state"
            >See all.</a
          >
        </div>
      </div>

      <div
        v-if="modalState"
        class="modal fade bd-example-modal-xl"
        tabindex="-1"
        role="dialog"
        :id="'modal' + state"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><slot></slot></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="item-grid">
                <div v-for="(makeup, index) in makeupList" :key="index">
                  <ItemCard
                    :lipState="lipState"
                    :blushState="blushState"
                    :skinState="skinState"
                    :analysisState="true"
                    :item="createItemForm(makeup)"
                  ></ItemCard>
                </div>
              </div>
              BOdy
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div v-if="startIndex > 0" class="next-item-btn" @click="handleBackItem">
        <i class="fas fa-chevron-left next-icon"></i>
      </div>
      <div v-if="makeupList" id="itemContainer" class="top-item slide-left">
        <div v-if="checkIndex(startIndex)" class="top-first">
          <div class="img-part">
            <img
              class="top-first-img fadeIn"
              :src="splitImageURL(makeupList[startIndex].api_featured_image)"
            />
          </div>
          <div class="top-detail">
            <div class="brand">{{ makeupList[startIndex].brand }}</div>
            <div class="title">{{ makeupList[startIndex].name }}</div>
            <div class="color-name">
              Color: {{ makeupList[startIndex].product_colors[0].colour_name }}
              <i
                class="fas fa-circle ml-1"
                :style="{
                  color: makeupList[startIndex].product_colors[0].hex_value + ' !important',
                }"
              ></i>
            </div>
            <div v-if="makeupList[startIndex].price > 0" class="price">
              ฿{{ converterUSDToTHB(makeupList[startIndex].price) }}
            </div>
          </div>
        </div>
        <div class="sub-top">
          <SubItemCard
            v-if="checkIndex(startIndex + 1)"
            class="sub-first slide-left"
            :item="makeupList[startIndex + 1]"
          ></SubItemCard>
          <SubItemCard
            v-if="checkIndex(startIndex + 2)"
            class="sub-secound slide-left"
            :item="makeupList[startIndex + 2]"
          ></SubItemCard>
        </div>
        <div class="sub-top"></div>
      </div>
      <div class="next-item-btn" @click="handleNextItem">
        <i class="fas fa-chevron-right next-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SubItemCard from '@/components/recommendation/SubItemCard.vue';
import ItemCard from '@/components/makeupRef/ItemCard.vue';

export default {
  components: {
    SubItemCard,
    ItemCard,
  },
  data() {
    return {
      startIndex: 0,
      modalState: false,
      itemCardModal: [],
    };
  },
  props: {
    skinState: Boolean,
    blushState: Boolean,
    lipState: Boolean,
    colorBg: String,
    makeupList: Array,
    state: String,
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
    checkIndex(index) {
      const arrayLength = this.makeupList.length - 1;
      return index <= arrayLength;
    },
    handleBackItem() {
      if (this.startIndex <= 0 || this.startIndex - 1 <= 0 || this.startIndex - 2 <= 0) {
        this.startIndex = 0;
      } else {
        this.startIndex = this.startIndex - 3;
      }
    },
    handleNextItem() {
      // $('#itemContainer').removeClass('slide-left');
      const arrayLength = this.makeupList.length - 1;
      if (
        this.startIndex >= arrayLength ||
        this.startIndex + 1 >= arrayLength ||
        this.startIndex + 2 >= arrayLength
      ) {
        this.startIndex = 0;
      } else {
        this.startIndex = this.startIndex + 3;
      }
    },
    handleModalState() {
      console.log(this.makeupList[0]);
      this.modalState = true;
    },
    hexToRGB(hexValue) {
      if (hexValue) {
        let hex = hexValue.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `(${r}, ${g}, ${b})`;
      }
    },
    createItemForm(item) {
      const itemCardForm = {
        _id: item._id,
        brand: item.brand,
        serie: item.name,
        price: item.price,
        image_link: item.image_link,
        product_link: item.product_link,
        category: item.category,
        color_name: item.product_colors[0].colour_name,
        rgb_value: this.hexToRGB(item.product_colors[0].hex_value),
        deltaE: item.deltaE,
        api_image_link: item.api_featured_image,
      };
      return itemCardForm;
    },
  },
};
</script>

<style lang="scss" scoped>
.title-icon {
  height: 9rem;
  max-width: 100%;
}

.item-grid {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 2.5rem 0.5rem;
}

.item-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.makeup-detail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.item-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.img-part {
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-makeup-btn {
  font-size: 0.9rem;
  text-align: right;
  text-decoration: underline;
}

.all-makeup-modal {
  cursor: pointer;
}

.title-makeup {
  font-size: 2rem;
  font-weight: 800;
  margin-left: -2rem;
  // color: #ffffff;
}

.top-container {
  // display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 20rem auto;
  // background: #d8b0b8;
}
.top-item {
  // display: flex;
  display: grid;
  grid-template-columns: 17rem 14rem;
  padding: 2rem;
}

.transformX {
  margin-right: -100px;
  transform: translateX(-100px);
  transition: transform 1s ease-in-out;
}

.sub-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-first-img {
  height: 13rem;
  max-width: 100%;
}

.top-detail {
  text-align: left;
  margin-top: 1.3rem;
}

.brand {
  font-weight: 700;
  font-size: 1rem;
}

.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.price {
  margin-top: 0.5rem;
}

.color-name {
  font-size: 0.8rem;
}

.next-item-btn {
  cursor: pointer;
}

.top-first {
  background: #ffffff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // box-shadow: 0 1.25em 1em -0.5em #0005;
}

.sub-first {
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
}

.sub-secound {
  margin-left: 0.2rem;
}

.next-icon {
  font-size: 2rem;
}

.slide-left {
  animation: 1s slide-left;
}
@keyframes slide-left {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}

@media screen and (max-width: 946px) {
  .top-item {
    grid-template-columns: 14rem 10rem;
  }
}

@media screen and (max-width: 800px) {
  .top-first-img {
    height: 11rem;
  }
  .brand {
    font-size: 1rem;
  }
  .title {
    font-size: 0.8rem;
  }
  .color-name {
    font-size: 0.7rem;
  }
  .price {
    font-size: 0.9rem;
  }

  .title-makeup {
    font-size: 1.2rem;
  }

  .title-icon {
    height: 7rem;
  }
  .top-container {
    grid-template-columns: 10rem auto;
  }
  .top-item {
    grid-template-columns: 12rem 10rem;
  }
}

@media screen and (max-width: 600px) {
  .top-first-img {
    height: 9rem;
  }
  .title {
    font-size: 0.7rem;
  }

  .title-makeup {
    font-size: 1rem;
  }
  .title-foundation {
    font-size: 1rem;
  }
  .title-icon {
    height: 6rem;
  }
  .top-item {
    padding: 1rem;
    grid-template-columns: 10rem 8rem;
  }
}

@media screen and (max-width: 502px) {
  .top-first-img {
    height: 8rem;
  }
  .top-first {
    padding: 0.7rem;
  }
  .brand {
    font-size: 0.9rem;
  }
  .title {
    font-size: 0.7rem;
  }
  .color-name {
    font-size: 0.6rem;
  }
  .price {
    font-size: 0.8rem;
  }

  .title-makeup {
    font-size: 1rem;
  }
  .title-foundation {
    font-size: 1rem;
  }
  .title-icon {
    height: 6rem;
  }
  .top-container {
    grid-template-columns: 8rem auto;
  }
}

@media screen and (max-width: 468px) {
  .top-container {
    flex-direction: column;
  }
  .top-first {
    flex-direction: row;
  }
  .top-item {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .sub-top {
    flex-direction: row;
  }
  .sub-first {
    margin: 0;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
  }

  .sub-secound {
    margin: 0;
    margin-top: 0.2rem;
  }

  .makeup-detail {
    padding-top: 1rem;
  }
  .title-makeup {
    font-size: 1.6rem;
    margin-left: -2rem;
  }

  .title-icon {
    height: 6rem;
    margin-left: -3rem;
  }
  .top-container {
    display: flex !important;
  }
}
</style>
