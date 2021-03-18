<template>
  <div>
    <Banner bannerImg="simulator_banner.png"></Banner>
    <UploadImageModal class="change-img-btn" titleButton="Change Image"></UploadImageModal>
    <div class="simulator-container">
      <div class="simulator-img">
        <div class="img-container">
          <img v-if="imgInput" class="user-img" :src="imgInput" alt="InputImg" />
          <img
            v-else
            class="user-img"
            :src="require(`@/assets/images/mockup/${imgUser}`)"
            alt="InputImg"
          />
        </div>
      </div>
      <SimulatorTab></SimulatorTab>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import SimulatorTab from '@/components/simulator/SimulatorTab.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Banner,
    UploadImageModal,
    SimulatorTab,
  },
  data() {
    return {
      imgUser: 'user.jpg',
      imgInput: '',
    };
  },
  computed: {
    ...mapGetters(['getImageUpload', 'getFileUpload']),
  },
  watch: {
    getImageUpload: {
      async handler(val) {
        if (val) {
          this.imgInput = val;
          // await this.uploadImageRef(this.getImageUpload, this.getFileUpload);
          // this.$store.dispatch('updateImageUpload', null);
          // this.$store.dispatch('updateFileUpload', null);
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.simulator-container {
  margin: 2rem;
}

.simulator-img {
  margin: 1rem 0;
}

.change-img-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.img-container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #cfcfcf;
}

.user-img {
  height: 25rem;
  max-width: 100%;
}

.simulator-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 720px) {
  .user-img {
    height: 20rem;
  }
}

@media screen and (max-width: 500px) {
  .user-img {
    height: 15rem;
  }
  .simulator-container {
    margin: 0.3rem;
  }
}
</style>
