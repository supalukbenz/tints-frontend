<template>
  <div class="upload-img-border">
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
    <!-- <img :src="imageUpload" :class="{ hideImage: !imageUpload }" class="image-upload" /> -->

    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <img :src="imageUpload" :class="{ hideImage: !imageUpload }" class="image-upload" />
            <div class="modal-btn" v-if="!imageUpload">
              <button class="modal-upload-btn" type="button">Upload</button>
              <button type="button"><i class="fas fa-undo"></i></button>
            </div>
            <div v-if="!imageUpload" @dragover.prevent @drop="onDrop" class="upload-modal-body">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageRef: null,
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
  },
};
</script>

<style scoped>
.modal-upload-img {
  color: #3e5374;
  font-weight: 800;
  cursor: pointer;
}

.modal-upload-btn {
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
  padding: 4rem;
  padding-top: 0;
  justify-content: center;
}

.modal-detail {
  font-size: 1.2rem;
}

.image-upload {
  max-width: 100%;
  height: 25rem;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
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
  padding: 3rem;
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
</style>
