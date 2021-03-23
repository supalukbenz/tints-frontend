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
          <div v-if="!simulatedState">
            <img
              v-if="imgInput"
              class="user-img fadeIn"
              :class="{ filterImg: loadingState }"
              :src="imgInput"
              alt="InputImg"
            />
            <img
              v-else
              class="user-img fadeIn"
              id="userImage"
              :class="{ filterImg: loadingState }"
              :src="require(`@/assets/images/mockup/${imgUser}`)"
              alt="InputImg"
            />
          </div>
          <div v-else>
            <img class="user-img" v-if="imageSimulated" :src="imageSimulated" />
          </div>
        </div>
        <Loading :loadingState="loadingState"></Loading>
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
import Loading from '@/components/main/Loading.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Banner,
    UploadImageModal,
    SimulatorTab,
    Loading,
  },
  data() {
    return {
      imgUser: 'user.jpg',
      imgInput: '',
      imageSimulated: null,
      loadingState: false,
      simulatedState: false,
    };
  },
  computed: {
    ...mapGetters([
      'getImageUpload',
      'getFileUpload',
      'getLipSimulatorDetail',
      'getLipSimulatedImage',
    ]),
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
    readFileImg(imgRes) {
      var reader = new window.FileReader();
      reader.readAsDataURL(imgRes);
      reader.onload = () => {
        this.imageSimulated = reader.result;
      };
    },
    async imageSrcToFile(src) {
      let res = await fetch(src);
      let buff = await res.arrayBuffer();
      return new File([buff], 'simulator_input.jpg', { type: 'image/jpeg' });
    },
    spilitRgbColor(rgb) {
      const getRgb = rgb.substring(1, rgb.length - 1);
      const rgbArr = getRgb.split(', ');
      return rgbArr;
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
    getLipSimulatorDetail: {
      async handler(val) {
        if (val) {
          this.loadingState = true;
          let form = {
            userID: 123,
            rlip: this.spilitRgbColor(val.rgb_value)[0],
            glip: this.spilitRgbColor(val.rgb_value)[1],
            blip: this.spilitRgbColor(val.rgb_value)[2],
          };
          if (this.getFileUpload) {
            form.fileUpload = await this.getFileUpload;
          } else {
            let src = document.getElementById('userImage').src;
            form.fileUpload = await this.imageSrcToFile(src);
          }
          await this.$store.dispatch('loadLipSimulated', form);
          await this.readFileImg(this.getLipSimulatedImage);
          this.loadingState = false;
          this.simulatedState = true;
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

.filterImg {
  filter: blur(2px);
  -webkit-filter: blur(2px);
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
