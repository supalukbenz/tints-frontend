<template>
  <div>
    <Banner bannerImg="simulator_banner.png"></Banner>
    <div class="simulator-container">
      <div class="simulator-img">
        <img class="user-img" src="@/assets/images/mockup/user.jpg" alt="InputImg" />
        <UploadImageModal titleButton="Change Image"></UploadImageModal>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Banner,
    UploadImageModal,
  },
  computed: {
    ...mapState({
      imageUpload: state => state.uploadImage.imageUpload,
      fileUpload: state => state.uploadImage.fileUpload,
    }),
  },
};
</script>

<style scoped>
.simulator-container {
  margin: 2rem;
}

.user-img {
  height: 30rem;
  max-width: 100%;
}

.simulator-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
