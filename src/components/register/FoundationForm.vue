<template>
  <div>
    <div class="step-one step-container">
      <div class="input-foundation">
        <div class="foundation-input">
          <div class="input-title">Brand</div>
          <div class="dropdown">
            <a
              class="btn dropdown-form brand-form dropdown-toggle"
              :class="{
                selectedItem: brandSelected !== '--Select brand--',
                notSelectedItem: brandSelected === '--Select brand--' && clickedNextState,
              }"
              data-display="static"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="item-display">{{ brandSelected }}</div>
            </a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <div v-for="(brand, index) in foundationBrand" :key="index">
                <a class="dropdown-item item" @click="handleBrandSelected(brand)">{{ brand }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="foundation-detail">
          <div class="foundation-input">
            <div class="input-title">Product</div>
            <div class="dropdown">
              <a
                class="btn dropdown-form product-form dropdown-toggle"
                data-display="static"
                :class="{
                  selectedItem: productSelected !== '--Select product--',
                  notSelectedItem: productSelected === '--Select product--' && clickedNextState,
                }"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="item-display">{{ productSelected }}</div>
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div v-for="(product, index) in foundationProduct" :key="index">
                  <a class="dropdown-item item" @click="handleProductSelected(product)">{{
                    product
                  }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="foundation-input">
            <div class="input-title">Color</div>
            <div class="dropdown">
              <a
                class="btn dropdown-form color-form dropdown-toggle"
                :class="{
                  selectedItem: colorSelected !== '--Select color--',
                  notSelectedItem: colorSelected === '--Select color--' && clickedNextState,
                }"
                data-display="static"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="item-display">{{ colorSelected }}</div>
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div v-for="(color, index) in foundationColor" :key="index">
                  <a class="dropdown-item item" @click="handleColorSelected(color)">{{ color }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      foundationBrand: [
        'nars',
        'Fenty',
        'Maybelline',
        'Your Skin But Better',
        'FauxFilter',
        'Born To Glow!',
        'Clinique',
        'nyx',
        'Forever Skin Glow Foundation',
        'L`Oréal Paris',
        'bareMinerals',
        'Giorgio Armani',
      ],
      foundationProduct: [
        'Burberry Matte Glow Fluid Foundation',
        'Oxygenetix Oxygenating Foundation SPF 25',
        'Clé de Peau Radiant Fluid Foundation ',
        'Vichy Mineral Blend Fluid',
        'Fenty Beauty Pro Filt’r Hydrating Longwear Foundation',
      ],
      foundationColor: ['001 pink', '002 sakura', '003 Fluide De Beauté Natural Finish Foundation'],
      brandSelected: '--Select brand--',
      productSelected: '--Select product--',
      colorSelected: '--Select color--',
    };
  },
  props: {
    neverOption: Boolean,
    clickedNextState: Boolean,
  },
  computed: {
    ...mapGetters(['getFoundationFormList']),
  },
  methods: {
    handleBrandSelected(brand) {
      this.brandSelected = brand;
    },
    handleProductSelected(product) {
      this.productSelected = product;
    },
    handleColorSelected(color) {
      this.colorSelected = color;
    },
  },
  watch: {
    clickedNextState(val) {
      if (val) {
        if (
          this.brandSelected !== '--Select brand--' &&
          this.productSelected !== '--Select product--' &&
          this.colorSelected !== '--Select color--'
        ) {
          let foundationList = this.getFoundationFormList;
          const form = {
            brandSelected: this.brandSelected,
            productSelected: this.productSelected,
            colorSelected: this.colorSelected,
          };
          foundationList.push(form);
          this.$store.dispatch('updateFoundationFormList', foundationList);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cursorBlock {
  cursor: not-allowed !important;
}

.selectedItem {
  border-color: #9dc99c !important;
}

.notSelectedItem {
  border-color: #a83f39 !important;
}

.step-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.foundation-input {
  margin: 0.2rem 1rem;
}

.input-foundation {
  // margin: 1rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.input-title {
  text-align: left;
  font-size: 0.9rem;
}

.dropdown-form {
  box-shadow: none;
  justify-content: space-between;
  border: 1px solid;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.color-form {
  width: 12rem;
}

.brand-form {
  width: 17rem;
}

.product-form {
  width: 17rem;
}

.foundation-detail {
  display: flex;
}

.item {
  font-size: 0.9rem;
  cursor: pointer;
}

.item-display {
  overflow: hidden;
}

@media screen and (max-width: 850px) {
  .question-part {
    padding: 2rem;
  }
}

@media screen and (max-width: 800px) {
  .color-form {
    width: 11rem;
  }

  .brand-form {
    width: 16rem;
  }

  .product-form {
    width: 16rem;
  }
}

@media screen and (max-width: 750px) {
  .question-part {
    padding: 1.5rem 0.5rem;
  }

  .color-form {
    width: 10rem;
  }

  .brand-form {
    width: 14rem;
  }

  .product-form {
    width: 14rem;
  }

  .item,
  .input-title,
  .dropdown-form {
    font-size: 0.8rem;
  }

  .foundation-input {
    margin: 0.3rem;
  }
}

@media screen and (max-width: 650px) {
  .color-form {
    width: 8rem;
  }

  .brand-form {
    width: 10rem;
  }

  .product-form {
    width: 10rem;
  }
}

@media screen and (max-width: 650px) {
  .foundation-detail {
    flex-direction: column;
  }
}

@media screen and (max-width: 450px) {
  .input-foundation {
    margin: 0;
  }

  .item,
  .item-display,
  .input-title {
    font-size: 0.7rem;
  }

  .foundation-input {
    margin: 0.2rem 0.5rem;
  }
}
</style>
