<template>
  <div>
    <div class="upload-img-border h-100">
      <div class="upload-img-container">
        <div class="upload-img-body">
          <div class="upload-title">&#11810; Who is the person you want to be? &#11813;</div>
          <input
            class="d-none"
            type="file"
            id="imgFile"
            @change="uploadImage"
            name="photo"
            accept="image/*"
          />
          <!-- <label for="imgFile" class="m-0 img-label">
          <div class="label-detail">
            Select File
            <div class="upload-icon"><i class="fas fa-upload"></i></div></div
        ></label> -->
          <button
            class="m-0 img-label bg-green-100 border-0"
            data-toggle="modal"
            data-target="#myModal"
          >
            <div class="label-detail">
              Upload Image
              <div class="upload-icon color-green-100"><i class="fas fa-image"></i></div>
            </div>
          </button>
        </div>
      </div>

      <!-- <div class="ref-result-container">
        <div class="ref-result-img">
          
          <img
            id="imageRef"
            src="https://i.pinimg.com/750x/54/43/0c/54430c91f53a89f939446e8af5c752f3.jpg"
            class="image-upload fadeIn-2 image-height-auto mt-4"
          />
          
        </div>
        <div class="part-reference">
          <RecommendPartCard class="fadeIn-3"></RecommendPartCard>
        </div>
      </div>
      <ReferenceTab class="fadeIn-3"></ReferenceTab> -->

      <div v-if="fileUploadState" class="mt-5 d-flex justify-content-center">
        <div class="spinner-grow color-green-200 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-green-100 mr-3 spinner" role="status"></div>
        <div class="spinner-grow color-brown-100 spinner" role="status"></div>
      </div>
      <div v-show="imageRef && !fileUploadState">
        <div class="ref-result-container">
          <div class="ref-result-img">
            <!-- <img class="line-img" src="@/assets/images/line.png" /> -->
            <img
              id="imageRef"
              :src="imageRef"
              :class="{ hideImage: !imageRef }"
              class="image-upload fadeIn-2 image-height-auto mt-4"
            />
            <!-- <img class="line-img fadeIn-2 img-rotate-180" src="@/assets/images/line.png" /> -->
          </div>
          <div class="part-reference">
            <RecommendPartCard class="fadeIn-3"></RecommendPartCard>
          </div>
        </div>
        <ReferenceTab class="fadeIn-3"></ReferenceTab>
      </div>

      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <!-- Modal content-->
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
import RecommendPartCard from '@/components/makeupRef/RecommendPartCard.vue';
import ReferenceTab from '@/components/makeupRef/ReferenceTab.vue';

export default {
  components: {
    RecommendPartCard,
    ReferenceTab,
  },
  data() {
    return {
      imageUpload: null,
      fileUpload: File,
      imgModal: false,
      fileUploadState: false,
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
    async uploadImage(e) {
      const image = await e.target.files[0];
      this.fileUpload = image;
      // await this.$store.dispatch('loadLipstickListByImgRef', e.target.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.imageUpload = e.target.result;
      };
    },
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;

      const reader = new FileReader();
      if (!files[0].type.match('image.*')) {
        alert('Select an image');
        return;
      }
      this.fileUpload = files[0];
      reader.onload = e => {
        this.imageUpload = e.target.result;
      };
      reader.readAsDataURL(files[0]);
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
        this.updateImageReference(this.imageUpload);
        await this.$store.dispatch('loadLipstickListByImgRef', this.fileUpload);

        this.fileUploadState = false;

        this.deleteImageUpload();
        this.scrollToElement('#imageRef');
      }
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
  padding: 4rem;
}
.upload-title {
  font-family: 'Yeseva One', cursive;
  margin-bottom: 1rem;
}
.upload-img-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 0;
  justify-content: center;
}

.modal-detail {
  font-size: 1.2rem;
}

.image-upload {
  max-width: 75%;
  height: 25rem;
}

.img-label {
  width: 12rem;
  /* background: #be5887; */
  color: #ffffff;
  cursor: pointer;
  border-radius: 2rem;
  font-weight: 500;
}

.img-label:hover {
  background: #a1afa0;
  .upload-icon {
    color: #a1afa0;
  }
}

.label-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
}
.upload-img-body {
  border: 1px solid #a1afa0;
  padding: 2rem 1rem;
  margin: 0rem 1rem;
}

.upload-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
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
  flex-direction: row;
  margin: 2rem;
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
  margin: 2rem;

  width: 50%;
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

@media screen and (max-width: 892px) {
  .upload-img-border {
    padding: 1rem;
  }
  .ref-result-container {
    flex-direction: column;
    align-items: center;
  }
  .ref-result-img {
    width: 100%;
  }
}
</style>
