<template>
  <div class="analyse-part">
    <div class="user-img-card fadeIn">
      <LoadingAnalysis class="loading-content" v-if="loadingState"></LoadingAnalysis>
      <button v-if="!loadingState" @click="handleAnalysis" type="button" class="analyse-btn">
        Analyse Image
      </button>
      <img class="user-img filterImg" :src="getUserInfo.userImgURL" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingAnalysis from '@/components/recommendation/LoadingAnalysis.vue';

export default {
  data() {
    return {
      loadingState: false,
    };
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getMakeupRecommended']),
  },
  components: {
    LoadingAnalysis,
  },
  methods: {
    async handleAnalysis() {
      this.loadingState = true;
      await this.$store.dispatch('loadMakeupRecommended');
      this.loadingState = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.analyse-part {
  padding: 2rem;
}

.loading-content {
  position: absolute;
  z-index: 20;
}

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
</style>
