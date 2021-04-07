<template>
  <div>
    <button
      v-if="predictionState"
      class="m-0 img-label border-0"
      data-toggle="modal"
      data-target="#myModal"
    >
      <div class="label-detail">
        {{ titleButton }}
        <div class="upload-icon"><i class="fas fa-image"></i></div>
      </div>
    </button>
    <button type="button" v-else class="change-img-link" data-toggle="modal" data-target="#myModal">
      {{ titleButton }} <i class="far fa-file-image"></i>
    </button>
    <input
      class="d-none"
      type="file"
      id="imgFile"
      @change="uploadImage"
      name="photo"
      accept="image/*"
    />
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <div class="modal-body">
            <ProgressBar
              :predictionState="predictionState"
              :state="state"
              @handleChangeState="handleChangeState"
            ></ProgressBar>
            <div v-if="loadingState" class="loading-bar">
              <div class="lds-heart"><div></div></div>
              Loading...
            </div>
            <img
              :src="imageUpload"
              :class="{ hideImage: !imageUpload || state !== 1 }"
              class="image-upload"
            />
            <div v-if="cheekImage && state === 2 && !loadingState">
              <div class="pick-color">
                Pick cheek color:
                <div class="cheek-color" :style="{ background: colorPicker }"></div>
              </div>
              <image-color-picker
                ref="colorPicker"
                @setColor="setColor"
                :width="300"
                :height="300"
                :showColor="false"
                :imagesrc="cheekImage"
              >
              </image-color-picker>
            </div>
            <div
              v-show="!imageUpload && state === 0"
              @dragover.prevent
              @drop="onDrop"
              class="upload-modal-body"
            >
              <i class="fas fa-download upload-modal-icon" />
              <div class="modal-detail">
                <span class="drag-title">Drag image here </span> or
                <label for="imgFile" class="m-0 modal-upload-img">
                  <div class="modal-upload-detail">
                    Select image.
                  </div></label
                >
              </div>
            </div>

            <div class="modal-btn my-3" v-show="imageUpload && !loadingState">
              <button class="modal-back-btn" type="button" @click="handleBackState">
                <i class="fas fa-chevron-left"></i> Back
              </button>
              <button
                @click="findCheekImage"
                class="modal-upload-btn border-0"
                type="button"
                v-if="predictionState && state === 1"
              >
                Next <i class="fas fa-chevron-right"></i>
              </button>
              <button
                @click="uploadImageRef"
                :disabled="!selectedColorState"
                data-dismiss="modal"
                class="modal-upload-btn border-0"
                type="button"
                v-if="predictionState && state === 2"
              >
                Upload <i class="fas fa-check"></i>
              </button>
              <button
                @click="uploadNewImage"
                data-dismiss="modal"
                class="modal-upload-btn border-0"
                type="button"
                v-if="!predictionState"
              >
                Upload <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
          <div class="modal-footer p-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageColorPicker from 'vue-img-color-picker';
import { mapGetters } from 'vuex';
import ProgressBar from '@/components/main/ProgressBar.vue';

export default {
  components: {
    ImageColorPicker,
    ProgressBar,
  },
  props: {
    titleButton: String,
    predictionState: Boolean,
  },
  data() {
    return {
      imageUpload: null,
      fileUpload: null,
      cheekImage: null,
      loadingState: false,
      colorPicker: '',
      state: 0,
      predictionInfo: {},
      selectedColorState: false,
    };
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getCheekImage']),
  },
  methods: {
    readFileImageUpload(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.imageUpload = e.target.result;
        this.fileUpload = image;
        this.state = 1;
      };
    },
    readFileImg(imgRes) {
      var reader = new window.FileReader();
      reader.readAsDataURL(imgRes);
      reader.onload = () => {
        this.cheekImage = reader.result;
      };
    },
    handleChangeState(state) {
      this.state = state;
      if (this.state === 0) {
        this.deleteImageUpload();
      }
    },
    checkImageType(file) {
      return !file.type.match('image.*');
    },
    setColor(color) {
      this.colorPicker = color;
      this.predictionInfo = {
        filename: this.getCheekImage.filename,
        blush_hex_color: color,
      };
      this.selectedColorState = true;
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
      this.fileUpload = null;
      this.cheekImage = null;
    },
    uploadImageRef() {
      if (this.imageUpload && this.selectedColorState) {
        this.$store.dispatch('updateImageUpload', this.imageUpload);
        this.$store.dispatch('updatePredictionInfo', this.predictionInfo);
        this.deleteImageUpload();
      }
    },
    uploadNewImage() {
      if (this.imageUpload && this.fileUpload) {
        this.$store.dispatch('updateImageUpload', this.imageUpload);
        this.$store.dispatch('updateFileUpload', this.fileUpload);
        this.state = 0;
        this.deleteImageUpload();
      }
    },
    handleBackState() {
      this.handleChangeState(this.state - 1);
    },
    async findCheekImage() {
      await this.$store.dispatch('updateCheekImage', '');
      if (this.imageUpload && this.fileUpload) {
        this.loadingState = true;
        const form = {
          fileUpload: this.fileUpload,
          userID: this.getUserInfo.userID,
        };
        await this.$store.dispatch('loadCheekImage', form);
        await this.readFileImg(this.getCheekImage.cheek_image);
        this.state = 2;
        this.loadingState = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}
.modal-upload-img {
  font-weight: 800;
  cursor: pointer;
}

.modal-btn {
  display: flex;
  justify-content: space-between;
}

.modal-upload-btn {
  color: #ffffff;
  border-radius: 0.5rem;
  font-weight: 600;
  width: 8rem;
  padding: 0.3rem 0rem;
  background: #edb194;

  &:hover {
    background: #be8e76;
  }
}

.modal-back-btn {
  width: 8rem;
  border-radius: 0.5rem;
  border: 2px solid rgb(165, 165, 165);
  color: rgb(165, 165, 165);
  background: #ffffff;
  // margin-left: 2.5rem;
}

.modal-back-btn:hover {
  color: #8f0730;
  border-color: #8f0730;
}

.modal-upload-img {
  color: #edb194;
}

.modal-upload-img:hover {
  text-decoration: underline;
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

.image-upload {
  max-width: 100%;
  height: 25rem;
}

.img-label {
  width: 14rem;
  color: #ffffff;
  cursor: pointer;
  border-radius: 2rem;
  font-weight: 500;
  background: #edb194;
}

.img-label:hover {
  background: #d49e85;
  .upload-icon {
    color: #d49e85;
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
  color: #edb194;
  margin-right: -0.25rem;
}

.change-img-link {
  background: #ffffff;
  border: 3px solid #ac6f63;
  border-right: none;
  padding: 0.5rem 1rem;
  border-radius: 3rem 0 0 3rem;
  color: #737373;
}

.loading-bar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.cheek-color {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgb(65, 63, 63);
  margin-left: 0.5rem;
  // border-radius: 50%;
}

.pick-color {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #edb194;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: ' ';
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #edb194;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
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

  .change-img-link {
    font-size: 0.8rem;
    padding: 0.4rem 0.7rem;
  }
}
</style>
