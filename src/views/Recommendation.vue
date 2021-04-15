<template>
  <div>
    <Banner bannerImg="recommend_banner.png"></Banner>
    <AnalyseStepCard></AnalyseStepCard>
  </div>
</template>

<script>
import Banner from '@/components/main/Banner.vue';
import AnalyseStepCard from '@/components/recommendation/AnalyseStepCard.vue';

export default {
  components: {
    Banner,
    AnalyseStepCard,    
  },
};
</script>
