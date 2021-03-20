<template>
  <div>
    <Banner bannerImg="simulator_banner.png"></Banner>
    <UploadImageModal class="change-img-btn" titleButton="Change Image"></UploadImageModal>
    <div class="img-profile-btn">
      <a class="user-img-link" @click="changeToUserImg">Use profile image</a>
    </div>
    <div class="simulator-container">
      <div class="simulator-img">
        <div class="img-container">
          <img v-if="imgInput" class="user-img fadeIn" :src="imgInput" alt="InputImg" />
          <img
            v-else
            class="user-img fadeIn"
            :src="require(`@/assets/images/mockup/${imgUser}`)"
            alt="InputImg"
          />
        </div>
      </div>
      <div class="selected-makeup">
        <div class="circle-img">
          <img class="selected-simu-img empty" src="@/assets/images/foundation_emtpy.png" />
        </div>
        <div class="circle-img">
          <img class="selected-simu-img empty" src="@/assets/images/blush_emtpy.png" />
        </div>
        <div class="circle-img">
          <div v-if="getLipSimulatorDetail" class="cancel-lip-simulated">
            <a @click="handleCancelLipSimulated" class="cancel-icon"
              ><i class="fas fa-times"></i
            ></a>
          </div>
          <img
            v-if="getLipSimulatorDetail"
            class="selected-simu-img fadeIn"
            :src="splitImageURL(getLipSimulatorDetail.api_image_link)"
          />
          <img v-else class="selected-simu-img empty" src="@/assets/images/lip_emtpy.png" />
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
    ...mapGetters(['getImageUpload', 'getFileUpload', 'getLipSimulatorDetail']),
  },
  methods: {
    changeToUserImg() {
      this.imgInput = '';
    },
    splitImageURL(url) {
      if (url) {
        return 'http://' + url.substring(2, url.length - 1);
      }
    },
    handleCancelLipSimulated() {
      this.$store.dispatch('updateLipSimulator', null);
    },
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

<style lang="scss" scoped>
.simulator-container {
  margin: 2rem;
}

.simulator-img {
  margin-bottom: 1rem;
}

.selected-makeup {
  display: flex;
  justify-content: center;
}

.circle-img {
  position: relative;
  width: 8rem;
  height: 8rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid #cfcfcf;
  margin: 0.5rem;
  flex-direction: column;
}

.selected-simu-img {
  height: 6rem;
  max-width: 100%;
}

.empty {
  height: 4rem;
}

.img-profile-btn {
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-top: 0.5rem;
}

.change-img-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.user-img-link {
  cursor: pointer;
  color: #2f4858;
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

.selected-simu-img {
  border-radius: 50%;
}

.cancel-lip-simulated {
  margin-top: 1rem;
  margin-right: -3.5rem;
  display: flex;
  height: 100%;
  position: absolute;
}

.cancel-icon {
  color: #cfcfcf;
  cursor: pointer;
  &:hover {
    color: #db141a;
  }
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
  .circle-img {
    width: 5rem;
    height: 5rem;
  }
  .selected-simu-img {
    height: 4rem;
  }

  .empty {
    height: 3rem;
  }
  .cancel-lip-simulated {
    margin-top: 1;
    margin-right: -2.5rem;
  }

  .cancel-icon {
    font-size: 0.7rem;
  }
}
</style>
