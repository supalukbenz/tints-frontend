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
          <button class="m-0 img-label border-0" data-toggle="modal" data-target="#myModal">
            <div class="label-detail">
              Upload Image
              <div class="upload-icon"><i class="fas fa-image"></i></div>
            </div>
          </button>
        </div>
      </div>
      <div class="ref-result-container" v-show="imageRef">
        <div class="ref-result-img">
          <img class="line-img" src="@/assets/images/line.png" />
          <img
            id="imageRef"
            :src="imageRef"
            :class="{ hideImage: !imageRef }"
            class="image-upload image-height-auto mt-4"
          />
          <img class="line-img img-rotate-180" src="@/assets/images/line.png" />
        </div>
        <div>
          Eye
        </div>
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
                  class="modal-upload-btn border-0"
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
                    <div class="modal-upload-detail">
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

export default {
  data() {
    return {
      imageRef:
        'https://blackpinkupdate.com/wp-content/uploads/2020/07/15-BLACKPINK-Jisoo-Scan-How-You-Like-That-Photobook-2020.jpg',
      imageUpload: null,
      imgModal: false,
    };
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
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
      if (this.imageUpload) {
        this.imageRef = await this.imageUpload;
        this.deleteImageUpload();
        this.scrollToElement('#imageRef');
      }
    },
  },
};
</script>

<style scoped>
button {
  outline: none;
}
.modal-upload-img {
  color: #be5887;
  font-weight: 800;
  cursor: pointer;
}

.modal-upload-btn {
  background: #be5887;
  color: #ffffff;
  border-radius: 2rem;
  font-weight: 600;
  width: 12rem;
  padding: 0.3rem 0rem;
  margin-right: -2rem;
}

.modal-upload-btn:hover {
  background: #a04971;
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
  background: rgba(197, 197, 197, 0.452);
}

.modal-upload-img:hover {
  text-decoration: underline;
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
  max-width: 100%;
  height: 25rem;
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
}

.img-label {
  width: 12rem;
  background: #be5887;
  color: #ffffff;
  cursor: pointer;
  border-radius: 2rem;
}
.label-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
}
.upload-img-body {
  border: 1px solid #222;
  padding: 2rem 1rem;
}

.upload-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #ffffff;
  color: #be5887;
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

.line-img {
  margin-top: 2rem;
  max-width: 100%;
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
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
}
.ref-result-img {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.image-height-auto {
  height: auto;
}

@media screen and (max-width: 892px) {
  .upload-img-border {
    padding: 1rem;
  }
}
</style>
