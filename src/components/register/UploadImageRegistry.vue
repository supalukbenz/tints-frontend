<template>
  <div>
    <LoadingStage v-show="loadingLoginStage" title="Loading">
      <LoadingSimulation></LoadingSimulation>
    </LoadingStage>
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
  </div>
</template>

<script>
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import LoadingSimulation from '@/components/simulator/LoadingSimulation.vue';
import LoadingStage from '@/components/main/LoadingStage.vue';
import { mapGetters } from 'vuex';
import { userResgister } from '@/api/authentication';

export default {
  components: {
    UploadImageModal,
    LoadingStage,
    LoadingSimulation,
  },
  computed: {
    ...mapGetters(['getImageUpload', 'getFileUpload', 'getUserRegisterInfo', 'getUserDetail']),
  },
  data() {
    return {
      imageUpload: null,
      loadingLoginStage: false,
    };
  },
  methods: {
    handleUploadNewImg() {
      this.imageUpload = null;
      this.$store.dispatch('updateImageUpload', null);
      this.$store.dispatch('updateFileUpload', null);
    },
    async handleSubmitRegis() {
      if (this.imageUpload) {
        this.loadingLoginStage = true;
        let updateUser = this.getUserRegisterInfo;
        updateUser.userImage = this.getFileUpload;
        await this.$store.dispatch('updateUserRegisterInfo', updateUser);
        // this.$store.dispatch('updateRegisterState', 1);        
        const form = {
          email: this.getUserRegisterInfo.email,
          password: this.getUserRegisterInfo.password,
          userImage: this.getUserRegisterInfo.userImage,
          foundationList: JSON.stringify(this.getUserRegisterInfo.foundationList),
        };
        await userResgister(form);
        await this.$store.dispatch('loadUserInfo', form);
        await this.$store.dispatch('updateUserToken', this.getUserDetail.token);
        this.loadingLoginStage = false;
        this.$router.push('/');
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
