<template>
  <div>
    <Banner bannerImg="user_feature-banner.png"></Banner>
    <div class="register-bg">
      <div class="register-container flex-center">
        <div class="register-card">
          <div class="step-regis-card">
            <div :class="{ stepActive: stepRegis === 1 }" class="step-txt">
              <i class="fas fa-circle circle-icon"></i> Register
            </div>
            <div class="step-line"></div>
            <div :class="{ stepActive: stepRegis === 2 }" class="step-txt">
              <i class="fas fa-circle circle-icon"></i> Questionnaire
            </div>
            <div class="step-line"></div>
            <div :class="{ stepActive: stepRegis === 3 }" class="step-txt">
              <i class="fas fa-circle circle-icon"></i> Upload Image
            </div>
          </div>
          <div class="regis-detail">
            <RegisterForm v-show="stepRegis === 1"></RegisterForm>
            <Questionare v-show="stepRegis === 2"></Questionare>
            <UploadImageRegistry v-show="stepRegis === 3"></UploadImageRegistry>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/register/RegisterForm.vue';
import Questionare from '@/components/register/Questionare.vue';
import UploadImageRegistry from '@/components/register/UploadImageRegistry.vue';
import Banner from '@/components/main/Banner.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    RegisterForm,
    Questionare,
    UploadImageRegistry,
    Banner,
  },
  computed: {
    ...mapGetters({ stepRegis: 'getRegisterState', userRegisInfo: 'getUserRegisterInfo' }),
  },
};
</script>

<style lang="scss" scoped>
.register-bg {
  background-image: url('../assets/images/banner/fabric_bg.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin-bottom: -6rem;
}

.register-container {
  padding: 5rem 1rem;
  padding-bottom: 8rem;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-card {
  // height: 26rem;
  // width: 60%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 1.25em 1em -0.5em #0005;
  border-radius: 1rem;
  background: #ffffff;
}

.step-regis-card {
  border-radius: 1rem 0 0 1rem;
  background: #edb194;
  padding: 4rem 1rem;
  // padding-top: 5rem;
}

.regis-detail {
  border-radius: 0 1rem 1rem 0;
}

.step-line {
  width: 0.1rem;
  height: 3rem;
  background: #2c3e50;
  margin-left: 3px;
}

.step-txt {
  text-align: left;
  font-size: 0.8rem;
  align-items: center;
  display: flex;
}

.circle-icon {
  font-size: 0.5rem;
  padding-right: 0.2rem;
}

.stepActive {
  color: #ffffff;
  font-size: 1rem !important;
  font-weight: 600;
}

@media screen and (max-width: 650px) {
  .stepActive {
    font-size: 0.9rem !important;
  }
  .step-txt {
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 450px) {
  .regis-detail {
    padding: 1rem 0.5rem;
  }
  .stepActive {
    font-size: 0.8rem !important;
  }
  .step-regis-card {
    padding: 4rem 0.5rem;
  }
}
</style>
