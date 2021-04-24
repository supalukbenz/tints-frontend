<template>
  <div class="analyse-part">
    <div class="user-img-card fadeIn" v-show="!makeupRecommended">
      <LoadingStage v-show="loadingState" title="Analyzing">
        <LoadingAnalysis class="loading-content"></LoadingAnalysis>
      </LoadingStage>
      <button v-if="!loadingState" @click="handleAnalysis" type="button" class="analyse-btn">
        Click to Analyse Image
      </button>
      <img class="user-img filterImg" :src="convertBase64Image(getUserInfo.base64_user_image)" />
    </div>
    <div v-show="makeupRecommended">
      <div class="user-img-complete fadeIn">
        <img class="user-img" :src="convertBase64Image(getUserInfo.base64_user_image)" />
        <div class="complete-banner" id="completeBanner">
          <div class="complete-text">
            Complete the analysis
            <i class="fas fa-check"></i>
          </div>
        </div>
      </div>
      <div>
        <TopRecommend
          :makeupList="getFoundationRecommended"
          :skinState="true"
          state="skin"
          :colorBg="foundationBg"
          >FOUNDATION</TopRecommend
        >
        <TopRecommend
          :makeupList="getBlushRecommended"
          state="blush"
          :blushState="true"
          :colorBg="blushBg"
          >BLUSH</TopRecommend
        >
        <TopRecommend :makeupList="getLipRecommended" state="lip" :lipState="true" :colorBg="lipBg"
          >LIPSTICK</TopRecommend
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingStage from '@/components/main/LoadingStage.vue';
import LoadingAnalysis from '@/components/recommendation/LoadingAnalysis.vue';
import TopRecommend from '@/components/recommendation/TopRecommend.vue';
import $ from 'jquery';

export default {
  data() {
    return {
      loadingState: false,
      foundationBg: '#E8D1C2',
      lipBg: '#d8b0b8',
      blushBg: '#E8E4DF',
      makeupRecommended: null,
    };
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getMakeupRecommended',
      'getLipRecommended',
      'getBlushRecommended',
      'getFoundationRecommended',
    ]),
  },
  components: {
    LoadingAnalysis,
    TopRecommend,
    LoadingStage,
  },
  methods: {
    async handleAnalysis() {
      this.loadingState = true;
      await this.$store.dispatch('loadMakeupRecommended');
      this.makeupRecommended = await this.getMakeupRecommended;
      this.scrollToElement('#completeBanner');
      this.loadingState = false;
    },
    scrollToElement(id) {
      this.$nextTick(() => {
        $('html, body').animate({ scrollTop: $(id).offset().top }, 1000);
      });
    },
    convertBase64Image(base64) {
      if (base64) {
        return `data:image/png;base64, ${base64}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.analyse-part {
  padding: 2rem 0;
}

.complete-text {
  // width: 14rem;
  border: 2px solid #353d4e;
  background: #ffffff;
  border-radius: 2rem;
  margin-top: -1rem;
  z-index: 30;
  font-size: 1.2rem;
  padding: 0.2rem 3rem;
}

.complete-banner {
  display: flex;
  justify-content: center;
  z-index: 30;
}

// .loading-content {
//   position: absolute;
//   z-index: 20;
// }

.analyse-btn {
  background: #353d4e;
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 1.2rem;
  padding: 0.5rem 3rem;
  border-radius: 2rem;
  border: none;
  position: absolute;
  z-index: 20;
}

.analyse-btn:hover {
  background: #1f232d;
}

.filterImg {
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.user-img-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-img {
  height: 30rem;
  max-width: 100%;
}

.user-img-complete {
  padding-bottom: 2rem;
}

@media screen and (max-width: 600px) {
  .user-img {
    height: 20rem;
  }
  .analyse-btn {
    padding: 0.3rem 2rem;
    font-size: 0.9rem;
  }
  .complete-text {
    font-size: 0.9rem;
    padding: 0.2rem 1rem;
  }
}
</style>
