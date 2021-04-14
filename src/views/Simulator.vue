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
          <div v-show="!simulatedState">
            <img
              v-show="imgInput"
              class="user-img fadeIn"
              :class="{ filterImg: loadingState }"
              :src="imgInput"
              alt="InputImg"
            />
            <img
              v-show="!imgInput"
              class="user-img fadeIn"
              id="userImage"
              :class="{ filterImg: loadingState }"
              :src="getUserInfo.userImgURL"
              alt="InputImg"
            />
          </div>
          <div v-show="simulatedState">
            <img
              :class="{ filterImg: loadingState }"
              class="user-img"
              v-if="imageSimulated"
              :src="imageSimulated"
            />
          </div>
        </div>
        <Loading :loadingState="loadingState"></Loading>
      </div>
      <div class="selected-makeup">
        <div class="circle-img">
          <div v-if="getMakeupSimulator" class="cancel-lip-simulated">
            <a @click="handleCancelSimulated" class="cancel-icon"><i class="fas fa-times"></i></a>
          </div>
          <img
            v-if="getMakeupSimulator"
            class="selected-simu-img fadeIn"
            :src="splitImageURL(getMakeupSimulator.api_image_link)"
          />
          <div v-show="!getMakeupSimulator" class="selected-simu-img empty">
            <i class="fas fa-magic"></i>
          </div>
        </div>
        <div class="level-lip-bar" v-if="simulatedState && getMakeupSimulator && !loadingState">
          <button
            type="button"
            class="level-btn"
            @click="makeupSimulatedLevel(0)"
            :class="{ selectedLevel: simulatedLevel === 0 }"
            :style="[
              getMakeupSimulator
                ? { background: 'rgb' + getMakeupSimulator.rgb_value + ' !important' }
                : '',
            ]"
          ></button>
          <button
            type="button"
            class="level-btn medium"
            @click="makeupSimulatedLevel(1)"
            :class="{ selectedLevel: simulatedLevel === 1 }"
            :style="[
              getMakeupSimulator
                ? { background: 'rgb' + getMakeupSimulator.rgb_value + ' !important' }
                : '',
            ]"
          ></button>
          <button
            type="button"
            class="level-btn light"
            @click="makeupSimulatedLevel(2)"
            :class="{ selectedLevel: simulatedLevel === 2 }"
            :style="[
              getMakeupSimulator
                ? { background: 'rgb' + getMakeupSimulator.rgb_value + ' !important' }
                : '',
            ]"
          ></button>
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
      simulatedLevel: 1,
    };
  },
  beforeCreate() {
    this.$store.dispatch('updateMakeupState', null);
    this.$store.dispatch('updateMakeupSimulator', null);
  },
  computed: {
    ...mapGetters([
      'getImageUpload',
      'getFileUpload',
      'getMakeupSimulator',
      'getMakeupSimulatedImage',
      'getMakeupState',
      'getUserInfo',
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
    handleCancelSimulated() {
      this.$store.dispatch('updateMakeupSimulator', null);
      this.$store.dispatch('updateMakeupState', '');
      this.simulatedState = false;
      this.imageSimulated = null;
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
    makeupSimulatedLevel(level) {
      this.imageSimulated = 'data:image/png;base64, ' + this.getMakeupSimulatedImage[level];
      this.simulatedLevel = level;
    },
  },
  watch: {
    getImageUpload: {
      async handler(val) {
        if (val) {
          this.simulatedState = false;
          this.loadingState = false;
          this.imgInput = val;
          this.$store.dispatch('updateMakeupState', '');
          this.$store.dispatch('updateMakeupSimulator', null);
        }
      },
      deep: true,
    },
    getMakeupSimulator: {
      async handler(val) {
        if (val) {
          this.loadingState = true;
          let form = {
            userID: 123,
            r_value: this.spilitRgbColor(val.rgb_value)[0],
            g_value: this.spilitRgbColor(val.rgb_value)[1],
            b_value: this.spilitRgbColor(val.rgb_value)[2],
          };

          if (this.getFileUpload) {
            form.fileUpload = await this.getFileUpload;
          } else {
            let src = document.getElementById('userImage').src;
            form.fileUpload = await this.imageSrcToFile(src);
          }
          console.log(this.getMakeupState);
          if (this.getMakeupState === 'Lip') {
            await this.$store.dispatch('loadLipSimulated', form);
          } else if (this.getMakeupState === 'Blush') {
            await this.$store.dispatch('loadBlushSimulated', form);
          } else if (this.getMakeupState === 'Foundation') {
            await this.$store.dispatch('loadFoundationSimulated', form);
          }

          if (this.getMakeupSimulatedImage) {
            this.imageSimulated = 'data:image/png;base64, ' + this.getMakeupSimulatedImage[1];
          }
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
button {
  outline: none;
}

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
  height: 4rem;
  font-size: 3rem;
  max-width: 100%;
  color: #cfcfcf;
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

.level-lip-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.level-btn {
  margin-bottom: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid transparent;
}

.medium {
  opacity: 0.7;
}

.light {
  opacity: 0.5;
}

.selectedLevel {
  border-color: #000 !important;
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
    margin: 0.2rem;
  }
  .selected-simu-img {
    height: 3rem;
    font-size: 2rem;
  }

  .cancel-lip-simulated {
    margin-top: 1;
    margin-right: -2.5rem;
  }

  .cancel-icon {
    font-size: 0.7rem;
  }
  .level-btn {
    margin-bottom: 0.5rem;
    height: 15px;
  }

  .img-profile-btn {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
  }

  .user-img-link {
    font-size: 0.7rem;
  }
}
</style>
