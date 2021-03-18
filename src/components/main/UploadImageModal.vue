<template>
  <div>
    <button
      v-if="uploadState"
      class="m-0 img-label bg-green-200 border-0"
      data-toggle="modal"
      data-target="#myModal"
    >
      <div class="label-detail">
        {{ titleButton }}
        <div class="upload-icon color-green-200"><i class="fas fa-image"></i></div>
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
</template>

<script>
export default {
  props: {
    titleButton: String,
    uploadState: Boolean,
  },
  data() {
    return {
      imageUpload: null,
      fileUpload: null,
    };
  },
  methods: {
    readFileImageUpload(image) {
      this.fileUpload = image;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.imageUpload = e.target.result;
      };
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
      this.fileUpload = null;
    },
    uploadImageRef() {
      if (this.imageUpload && this.fileUpload) {
        this.$store.dispatch('updateImageUpload', this.imageUpload);
        this.$store.dispatch('updateFileUpload', this.fileUpload);
        this.deleteImageUpload();
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

.change-img-link {
  background: #ffffff;
  border: 3px solid #ffaaaa;
  border-right: none;
  padding: 0.5rem 1rem;
  border-radius: 3rem 0 0 3rem;
  color: #737373;
}

.change-img-link:hover {
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
