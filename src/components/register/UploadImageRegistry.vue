<template>
  <div class="upload-image-container">
    <div v-show="!imageUpload">
      <UploadImageModal :registerState="true" titleButton="Upload Image"></UploadImageModal>
    </div>
    <div v-show="imageUpload" class="new-img-part">
      <a @click="handleUploadNewImg" class="upload-new-btn">Upload new image</a>
    </div>
    <div class="img-container">
      <img v-show="imageUpload" class="user-img fadeIn" :src="imageUpload" alt="RegisImg" />
    </div>
    <div v-show="imageUpload" class="btn-feature">
      <button @click="handleSubmitRegis" type="button" class="submit-btn">Submit</button>
    </div>
  </div>
</template>

<script>
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    UploadImageModal,
  },
  computed: {
    ...mapGetters(['getImageUpload', 'getFileUpload', 'getUserRegisterInfo']),
  },
  data() {
    return {
      imageUpload: null,
    };
  },
  methods: {
    handleUploadNewImg() {
      this.imageUpload = null;
      this.$store.dispatch('updateImageUpload', null);
      this.$store.dispatch('updateFileUpload', null);
    },
    handleSubmitRegis() {
      if (this.imageUpload) {
        console.log('up');
        let updateUser = this.getUserRegisterInfo;
        updateUser.image = this.getFileUpload;
        this.$store.dispatch('updateUserRegisterInfo', updateUser);
        this.$store.dispatch('updateRegisterState', 3);
        //registerpath
        this.$router.push('/login');
      }
    },
  },
  watch: {
    getImageUpload: {
      async handler(val) {
        if (val) {
          this.imageUpload = val;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 4rem;
}

.img-container {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.user-img {
  height: 20rem;
  max-width: 100%;
}

.new-img-part {
  display: flex;
  width: 100%;
}

.upload-new-btn {
  cursor: pointer;
  font-size: 0.8rem;
  color: #222;
  text-decoration: underline;
}

.submit-btn {
  border: 2px solid #edb194;
  color: #edb194;
  background: #ffffff;
  font-weight: 800;
  padding: 0.2rem 3rem;
  border-radius: 10rem;
}

.submit-btn:hover {
  background: #edb194;
  color: #ffffff;
}

.new-img-part {
}

@media screen and (max-width: 750px) {
  .upload-image-container {
    padding: 4rem 2rem;
  }
  .user-img {
    height: 15rem;
  }
}

@media screen and (max-width: 650px) {
  .upload-image-container {
    padding: 3rem 1rem;
  }
  .user-img {
    height: 10rem;
  }
  .submit-btn {
    padding: 0.1rem 1.5rem;
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 450px) {
  .upload-image-container {
    padding: 2rem 0.5rem;
  }
}
</style>
