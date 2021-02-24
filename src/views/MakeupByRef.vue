<template>
  <div>
    <Banner bannerImg="makeup_by_ref_banner.png"></Banner>
    <div class="upload-img-border h-100">
      <div class="upload-img-container">
        <div class="upload-img-body">
          <input
            class="d-none"
            type="file"
            id="imgFile"
            @change="uploadImage"
            name="photo"
            accept="image/*"
          />
          <div class="makeup-ref-body">
            <ExampleCard v-show="!imgResult"></ExampleCard>
            <div class="btn-body">
              <button
                class="m-0 img-label bg-green-200 border-0"
                data-toggle="modal"
                data-target="#myModal"
              >
                <div class="label-detail">
                  Upload Image
                  <div class="upload-icon color-green-200"><i class="fas fa-image"></i></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fileUploadState" class="mt-5 d-flex justify-content-center">
        <div class="spinner-grow color-green-200 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-green-100 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-brown-100 spinner" role="status"></div>
      </div>
      <!-- <div v-show="imgResult && !fileUploadState"> -->
      <div v-show="!fileUploadState && getSortedLipstickList.length > 0">
        <div class="ref-result-container">
          <div class="ref-result-img">
            <img
              id="imageRef"
              :src="imgResult"
              :class="{ hideImage: !imgResult }"
              class="image-upload fadeIn-2"
            />
            <a class="add-simu-btn"
              ><i class="fas fa-plus-circle"></i> Add to simulator collection</a
            >
          </div>
          <div class="part-reference">
            <div class="sketchy top-title">
              suggested
              <div class="top-detail">the similar makeup</div>
            </div>
            <div class="recommend-detail">
              <RecommendPartCard
                :lipstickList="getSortedLipstickList[0]"
                class="fadeIn-3"
              ></RecommendPartCard>
              <RecommendPartCard
                :lipstickList="getSortedLipstickList[0]"
                class="fadeIn-3"
              ></RecommendPartCard>
              <RecommendPartCard
                :lipstickList="getSortedLipstickList[0]"
                class="fadeIn-3"
              ></RecommendPartCard>
            </div>
          </div>
          <!-- <div class="part-reference-mobile" v-if="changeRecommendCardState">
            <div class="sketchy top-title">
              suggested
              <div class="top-detail">the similar makeup</div>
            </div>
            <ItemCard :recommendState="true" :item="getSortedLipstickList[0]"></ItemCard>
            <ItemCard :recommendState="true" :item="getSortedLipstickList[0]"></ItemCard>
            <ItemCard :recommendState="true" :item="getSortedLipstickList[0]"></ItemCard>
          </div> -->
        </div>
        <ReferenceTab class="fadeIn-3"></ReferenceTab>
      </div>

      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div class="modal-btn mb-3" v-show="imageUpload">
                <button
                  @click="uploadImageRef"
                  data-dismiss="modal"
                  class="modal-upload-btn bg-green-100 border-0"
                  type="button"
                >
                  Upload <i class="fas fa-check"></i>
                </button>
                <button class="modal-reset-btn" type="button" @click="deleteImageUpload">
                  <i class="fas fa-undo"></i>
                </button>
              </div>
              <img :src="imageUpload" :class="{ hideImage: !imageUpload }" class="image-upload" />
              <div v-show="!imageUpload" @dragover.prevent @drop="onDrop" class="upload-modal-body">
                <i class="fas fa-download upload-modal-icon" />
                <div class="modal-detail">
                  <span class="drag-title">Drag image here </span> or
                  <label for="imgFile" class="m-0 modal-upload-img">
                    <div class="modal-upload-detail color-green-100">
                      Select image.
                    </div></label
                  >
                </div>
              </div>
            </div>
            <div class="modal-footer p-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions, mapState, mapGetters } from 'vuex';
import Banner from '@/components/main/Banner.vue';
import RecommendPartCard from '@/components/makeupRef/RecommendPartCard.vue';
import ReferenceTab from '@/components/makeupRef/ReferenceTab.vue';
import ExampleCard from '@/components/makeupRef/ExampleCard.vue';
// import ItemCard from '@/components/makeupRef/ItemCard.vue';

export default {
  components: {
    RecommendPartCard,
    ReferenceTab,
    Banner,
    ExampleCard,
  },
  data() {
    return {
      imageUpload: null,
      fileUpload: File,
      imgModal: false,
      imgResult: null,
      fileUploadState: false,
      rgbColor: '',
      changeRecommendCardState: false,
    };
  },
  computed: {
    ...mapState({
      imageRef: state => state.imageRef,
    }),
    ...mapGetters(['getSortedLipstickList']),
  },
  methods: {
    ...mapActions(['updateImageReference']),
    readFileImageUpload(image) {
      this.fileUpload = image;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.imageUpload = e.target.result;
      };
    },
    myEventHandler() {
      window.innerWidth <= 892
        ? (this.changeRecommendCardState = true)
        : (this.changeRecommendCardState = false);
    },
    checkImageType(file) {
      return !file.type.match('image.*');
    },
    async uploadImage(e) {
      const files = await e.target.files;
      if (this.checkImageType(files[0])) {
        return;
      }
      await this.readFileImageUpload(files[0]);
    },
    async onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      const files = await e.dataTransfer.files;
      if (this.checkImageType(files[0])) {
        return;
      }
      await this.readFileImageUpload(files[0]);
    },
    deleteImageUpload() {
      this.imageUpload = null;
    },
    scrollToElement(id) {
      this.$nextTick(() => {
        $('html, body').animate({ scrollTop: $(id).offset().top }, 1000);
      });
    },
    async uploadImageRef() {
      this.fileUploadState = true;
      if (this.imageUpload) {
        // await this.$store.dispatch('updateLipstickListByImgRef', []);
        // await this.updateImageReference(this.imageUpload);

        this.imgResult = this.imageUpload;
        await this.$store.dispatch('loadLipstickListByImgRef', this.fileUpload);
        this.rgbColor = this.getSortedLipstickList[0].rgb_value;
        this.fileUploadState = false;

        this.deleteImageUpload();
        this.scrollToElement('#imageRef');
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
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

.btn-body {
  margin-top: 5rem;
}

.makeup-ref-body {
  display: flex;
  justify-content: space-around;
}

.modal-upload-img {
  font-weight: 800;
  cursor: pointer;
}

.modal-upload-btn {
  color: #ffffff;
  border-radius: 2rem;
  font-weight: 600;
  width: 12rem;
  padding: 0.3rem 0rem;
  margin-right: -2rem;

  &:hover {
    background: #a1afa0;
  }
}

.ex-image {
  height: 25rem;
  width: auto;
}

.modal-reset-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid rgb(165, 165, 165);
  color: rgb(165, 165, 165);
  background: #ffffff;
  margin-right: -3rem;
  margin-left: 2.5rem;
}

.modal-reset-btn:hover {
  color: #8f0730;
  border-color: #8f0730;
}

.modal-upload-img:hover {
  text-decoration: underline;
  color: #9dc99c;
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

.img-label {
  width: 13rem;
  color: #ffffff;
  cursor: pointer;
  border-radius: 2rem;
  font-weight: 500;
}

.img-label:hover {
  background: #6b746a;
  .upload-icon {
    color: #6b746a;
  }
}

.label-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.3rem;
  padding-right: 0rem;
  font-weight: 700;
  font-size: 1.1rem;
}

.upload-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #ffffff;
  /* color: #be5887; */
  margin-right: -0.25rem;
}

.hideImage {
  display: none;
  height: 0;
}

.upload-modal-body {
  border: 2px dashed rgb(165, 165, 165);
  padding: 2rem;
  border-radius: 1rem;
}

.upload-modal-icon {
  color: rgb(197, 197, 197);
  font-size: 5rem;
  margin-bottom: 1rem;
}

.drag-title {
  color: rgb(165, 165, 165);
  font-weight: 500;
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
    flex-direction: column-reverse;
    align-items: center;
    .btn-body {
      margin-top: 0;
      margin-bottom: 2rem;
      margin-right: 0;
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

@media screen and (max-width: 662px) {
  .img-label {
    width: 10rem;
    .label-detail {
      font-size: 0.8rem;
    }

    .upload-icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
