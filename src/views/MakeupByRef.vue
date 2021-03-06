<template>
  <div>
    <Banner bannerImg="makeup-by-ref_banner.png"></Banner>
    <LoadingStage v-show="loadingState" title="Processing">
      <div class="mt-5 d-flex justify-content-center">
        <div class="spinner-grow color-green-200 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-green-100 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-brown-100 spinner" role="status"></div>
      </div>
    </LoadingStage>
    <div class="upload-img-border h-100">
      <div class="upload-img-container">
        <div class="upload-img-body">
          <div class="makeup-ref-body">
            <div class="btn-body">
              <UploadImageModal
                :predictionState="true"
                titleButton="Upload Image"
              ></UploadImageModal>
            </div>
            <ExampleCard v-show="!imgResult"></ExampleCard>
          </div>
        </div>
      </div>
      <div v-show="!fileUploadState && getMakeupByImageRef && imgResult">
        <div class="ref-result-container">
          <div class="ref-result-img">
            <img
              id="imageRef"
              :src="imgResult"
              :class="{ hideImage: !imgResult }"
              class="image-upload fadeIn-2"
            />
          </div>
          <div class="part-reference" v-if="getMakeupByImageRef">
            <div class="sketchy top-title">
              suggested
              <div class="top-detail">the similar makeup</div>
            </div>
            <div class="recommend-detail">
              <RecommendPartCard
                :skinState="true"
                :item="getMakeupByImageRef.Foundation[0]"
                :rgbColor="rgbColor"
                class="fadeIn-3"
              ></RecommendPartCard>
              <RecommendPartCard
                :item="getMakeupByImageRef.Blush[0]"
                :blushState="true"
                :rgbColor="rgbColor"
                class="fadeIn-3"
              ></RecommendPartCard>
              <RecommendPartCard
                :item="getMakeupByImageRef.Lipstick[0]"
                :lipState="true"
                :rgbColor="rgbColor"
                class="fadeIn-3"
              ></RecommendPartCard>
            </div>
          </div>
          <div class="alert-banner">
            <div v-show="!sameSkinType(userType, refType)" class="alert alert-danger" role="alert">
              <i class="fas fa-exclamation-circle"></i>
              Notes: The foundation color(<span class="type-foundation">{{ refType }}</span
              >) obtained from the reference image have
              <span class="type-foundation">different</span> shades from your skin tones(<span
                class="type-foundation"
                >{{ userType }}</span
              >).
            </div>
            <div class="alert alert-info" v-show="sameSkinType(userType, refType)" role="alert">
              <i class="fas fa-exclamation-circle"></i>

              Notes: Although the foundation color obtained from the reference image is the
              <span class="type-foundation">same tone</span> as your skin,
              <span class="type-foundation">beware of some different undertone shades.</span>
            </div>
          </div>
        </div>
        <ReferenceTab class="fadeIn-3"></ReferenceTab>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import LoadingStage from '@/components/main/LoadingStage.vue';
import Banner from '@/components/main/Banner.vue';
import RecommendPartCard from '@/components/makeupRef/RecommendPartCard.vue';
import ReferenceTab from '@/components/makeupRef/ReferenceTab.vue';
import ExampleCard from '@/components/makeupRef/ExampleCard.vue';
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import axios from 'axios';
// import ItemCard from '@/components/makeupRef/ItemCard.vue';

export default {
  components: {
    RecommendPartCard,
    ReferenceTab,
    Banner,
    ExampleCard,
    UploadImageModal,
    LoadingStage,
  },
  data() {
    return {
      imgResult: null,
      fileUploadState: false,
      loadingState: false,
      rgbColor: '',
      userType: '',
      refType: '',
      changeRecommendCardState: false,
    };
  },
  computed: {
    ...mapGetters([
      'getMakeupByImageRef',
      'getImageUpload',
      'getUserInfo',
      'getPredictionInfo',
      'getUserToken',
    ]),
  },
  methods: {
    ...mapActions(['updateImageReference']),
    myEventHandler() {
      window.innerWidth <= 892
        ? (this.changeRecommendCardState = true)
        : (this.changeRecommendCardState = false);
    },
    deleteImageUpload() {
      this.imageUpload = null;
    },
    scrollToElement(id) {
      this.$nextTick(() => {
        $('html, body').animate({ scrollTop: $(id).offset().top }, 1000);
      });
    },
    checkObjectNotEmpty(obj) {
      return Object.keys(obj).length !== 0;
    },
    sameSkinType(user, imgRef) {
      return user === imgRef;
    },
    async uploadImageRef(imageUpload) {
      try {
        this.fileUploadState = true;
        this.loadingState = true;

        // await this.$store.dispatch('updateLipstickListByImgRef', []);
        // await this.updateImageReference(this.imageUpload);

        this.imgResult = imageUpload;
        const form = {
          filename: this.getPredictionInfo.filename,
          blush_hex_color: this.getPredictionInfo.blush_hex_color,
        };
        await this.$store.dispatch('updateMakeupByImageRef', form);
        this.userType = this.getMakeupByImageRef.ref_compare_user_skin_type.User_skin_type;
        this.refType = this.getMakeupByImageRef.ref_compare_user_skin_type.Ref_skin_type;

        this.fileUploadState = false;
        this.loadingState = false;
        this.scrollToElement('#imageRef');
      } catch (err) {
        this.fileUploadState = false;
        this.loadingState = false;
        this.imgResult = null;
      }
    },
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.getUserToken}`;
    window.addEventListener('resize', this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
  },
  watch: {
    getImageUpload: {
      async handler(val) {
        if (val) {
          await this.uploadImageRef(this.getImageUpload);
          this.$store.dispatch('updateImageUpload', null);
          this.$store.dispatch('updatePredictionInfo', null);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}

.spinner {
  width: 3rem;
  height: 3rem;
}

.type-foundation {
  font-weight: 700;
}

.btn-body {
  margin: 2rem;
}

.makeup-ref-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ex-image {
  height: 25rem;
  width: auto;
}

.upload-img-border {
  padding: 2rem 4rem;
}

.upload-img-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 0;
  justify-content: center;
}

.image-upload {
  max-width: 100%;
  height: 25rem;
}

.hideImage {
  display: none;
  height: 0;
}

.fadeIn-2 {
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
}

.fadeIn-3 {
  -webkit-animation: fadein 3s;
  -moz-animation: fadein 3s;
  -ms-animation: fadein 3s;
  -o-animation: fadein 3s;
  animation: fadein 3s;
}

.fadeIn-4 {
  -webkit-animation: fadein 4s;
  -moz-animation: fadein 4s;
  -ms-animation: fadein 4s;
  -o-animation: fadein 4s;
  animation: fadein 5s;
}

.line-img {
  margin-top: 2rem;
  max-width: 100%;
}

.img-rotate-180 {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.ref-result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  margin: 2rem 0;
  border-top: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
}
.ref-result-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.image-height-auto {
  height: auto;
}

.part-reference {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.blue-bg {
  background: #c0fcf8;
}

.green-bg {
  background: #9bdeac;
}

.dust-bg {
  background: #bfa5a6;
}

.part-reference-mobile {
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  grid-template-columns: 11rem 11rem;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
}

.top-title {
  text-transform: uppercase;
  font-weight: 700;
  width: 50%;
}

.top-detail {
  font-size: 0.8rem;
}

.sketchy {
  padding: 0.5rem;
  display: inline-block;
  border: 3px solid #333333;
  font-size: 1.7rem;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  background: rgba(237, 176, 146, 0.4);
  color: #000000;
  position: relative;
  margin-bottom: 0.5rem;

  &::before {
    content: '';
    border: 2px solid #353535;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
  }
}

.add-simu-btn {
  color: #989898;
  margin-top: 1rem;
  cursor: pointer;
}

.recommend-detail {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 1080px) {
  .upload-img-border {
    padding: 2rem 1rem;
  }
}

@media screen and (max-width: 920px) {
  .makeup-ref-body {
    align-items: center;
    .btn-body {
      margin: 0.5rem;
    }
  }

  .recommend-detail {
    flex-direction: column;
  }

  .top-title {
    width: 100%;
  }

  .sketchy {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
  }

  .ref-result-container {
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
  }
  .ref-result-img {
    width: 100%;
  }
}
</style>
