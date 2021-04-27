<template>
  <div class="like-container">
    <div>
      <div class="title-liked"><slot></slot></div>
      <div v-show="user.likedFoundation.length === 0 && skinState">
        <div class="alert" role="alert">
          <h5 class="alert-heading banner-heading">
            The cosmetic list is still empty!
          </h5>
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>
      <Carousel v-show="skinState" :skinState="skinState" :list="user.likedFoundation"></Carousel>
      <div v-show="user.likedFoundation.length !== 0 && skinState">
        <div class="alert" role="alert">
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>

      <div v-show="user.likedBlush.length === 0 && blushState">
        <div class="alert" role="alert">
          <h5 class="alert-heading banner-heading">
            The cosmetic list is still empty!
          </h5>
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>
      <Carousel v-show="blushState" :blushState="blushState" :list="user.likedBlush"></Carousel>
      <div v-show="user.likedBlush.length !== 0 && blushState">
        <div class="alert" role="alert">
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>

      <div v-show="user.likedLip.length === 0 && lipsState">
        <div class="alert" role="alert">
          <h5 class="alert-heading banner-heading">
            The cosmetic list is still empty!
          </h5>
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>
      <Carousel v-show="lipsState" :lipState="lipsState" :list="user.likedLip"></Carousel>
      <div v-show="user.likedLip.length !== 0 && lipsState">
        <div class="alert" role="alert">
          <hr />
          <p class="mb-0 benner-detail">
            Add more cosmetics from
            <router-link class="banner-link" to="/makeup-ref">Makeup By Reference</router-link> and
            <router-link class="banner-link" to="/recommendation">Recommendation</router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="lip-container">
      <div class="title-liked">Blush</div>
      <Carousel :blushState="true" :list="user.likedBlush"></Carousel>
    </div> -->
  </div>
</template>

<script>
import Carousel from '@/components/simulator/Carousel.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Carousel,
  },
  props: {
    skinState: Boolean,
    blushState: Boolean,
    lipsState: Boolean,
  },
  computed: {
    ...mapGetters({ user: 'getUserInfo' }),
  },
};
</script>

<style lang="scss" scoped>
.banner-heading {
  font-weight: 800;
}

.banner-link {
  font-weight: 800;
  color: #333333;
  text-decoration: underline;
}

.title-liked {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  border: 3px solid #333333;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  background: rgba(237, 176, 146, 0.4);
  padding: 0.5rem;
  margin-bottom: 2rem;
  color: #000000;
  position: relative;

  &::before {
    content: '';
    border: 2px solid #353535;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
  }
}

@media screen and (max-width: 400px) {
  .banner-heading {
    font-size: 0.9rem;
  }

  .benner-detail {
    font-size: 0.8rem;
  }
}
</style>
