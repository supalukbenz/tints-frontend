<template>
  <div class="simutate-card">
    <!-- <img class="cosmetic-bg" src="@/assets/images/eyeshadow-pink.png" /> -->
    <div class="simulate-detail">
      <router-link class="simutlate-btn" to="/makeup-ref">
        <span>Simulate <i class="fas fa-star"></i></span>
      </router-link>
      <div class="ref-card-animate"></div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  data() {
    return {
      imgURL: 'lisa.jpg',
    };
  },
  created() {
    // var images = ['lisa-1.png', 'lisa-2.png', 'lisa.jpg'];
    // var index = 0;
    // setInterval(() => {
    //   $('#ref-image').fadeOut('slow', () => {
    //     this.imgURL = images[index];
    //     index++;
    //     if (index === images.length) {
    //       index = 0;
    //     }
    //     $('#ref-image').fadeIn('slow');
    //   });
    // }, 3000);
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap');

.simutlate-btn {
  width: 16rem;
  padding: 0.5rem;
  padding-left: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 1.1rem;
  color: #ffffff;
  background: #9e5f53;
  text-align: left;
  position: relative;
  transition: all 0.35s;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -o-transition: all 0.35s;
  -ms-transition: all 0.35s;
  text-decoration: none;
}

.simutlate-btn span {
  position: relative;
  z-index: 2;
}

.simutlate-btn:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #55433b;
  transition: all 0.35s;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -o-transition: all 0.35s;
  -ms-transition: all 0.35s;
}

.simutlate-btn:hover {
  color: #fff;
}

.simutlate-btn:hover:after {
  width: 100%;
}

.simutate-card {
  font-family: 'Bodoni Moda', serif;
  padding: 3rem;
}

.fadeIn {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.simulate-detail {
  position: relative;
  width: 90vmin;
  height: calc(90vmin * 9 / 16);
  margin: auto;
  overflow: hidden;
  background: rgba(189, 168, 158, 0.6);
  // box-shadow: 0 1.25em 1em -0.5em #0005;
}

.ref-img-card {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(162, 176, 160, 0.5);
}

.ref-img {
  display: flex;
  height: 100%;
  object-fit: contain;
  object-position: 0% 50%;
  transition: transform 1s;

  .simulate-detail:hover & {
    transform: translateX(-3%);
    transition-duration: 5s;
  }
}

:root {
  --ref-card-animate-w: 10vmin;
}

@keyframes move-x {
  50% {
    transform: translateX(var(--x1));
  }
  100% {
    transform: translateX(var(--x2));
  }
}

.ref-card-animate {
  position: absolute;
  top: 0;
  bottom: 0;
  animation: gg 0.5s ease-out forwards;
  pointer-events: none;

  .simulate-detail:hover & {
    animation-name: move-x;
  }
}

.ref-card-animate {
  z-index: 2;
  width: 10vmin;
  right: 100%;
  background-color: rgba(84, 66, 59, 0.57);
  animation-delay: 0.1s;

  --x1: 0;
  --x2: 95%;
}

@media screen and (max-width: 892px) {
  .simutate-card {
    padding: 1rem;
  }
}
</style>
