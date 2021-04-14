<template>
  <div class="simulation-container">
    <div class="simulator-card">
      <div class="content-container">
        <div class="content-detail">
          <router-link class="simulator-btn" to="/simulator">Simulation</router-link>
        </div>
      </div>
      <div class="model-container">
        <img
          id="ref-image"
          class="ref-img fadeIn"
          :src="require(`@/assets/images/card/${imgURL}`)"
          alt="SimulatorCard"
        />
      </div>
      <div class="ref-card-animate"></div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  data() {
    return {
      imgURL: 'simulator_img.jpeg',
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
.simulation-container {
  display: flex;
  justify-content: center;
}
.simulator-card {
  display: flex;
  justify-content: flex-start;
  width: 90vmin;
  height: calc(90vmin * 9 / 16);
  margin: auto;
  position: relative;
  overflow: hidden;
  // width: 60%;
}

.model-container {
  width: 40%;
}

.simulator-btn {
  border: none;
  background: #ac6f63;
  color: #ffffff;
  padding: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: #714941;
  }
}

.ref-img {
  height: 100%;
  width: 100%;
}

.content-container {
  background-image: url('../../assets/images/card/simulator-card.png');
  background-position: center;
  background-size: cover;
  height: calc(90vmin * 9 / 16);
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-detail {
  margin-top: 5rem;
}

.fadeIn {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.ref-img {
  display: flex;
  height: 100%;
  object-position: 0% 50%;
  transition: transform 1s;

  .simulator-card:hover & {
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

  .simulator-card:hover & {
    animation-name: move-x;
  }
}

.ref-card-animate {
  z-index: 2;
  width: 10vmin;
  left: 100%;
  background: rgba(172, 111, 99, 0.66);
  animation-delay: 0.1s;

  --x1: 0;
  --x2: -95%;
}

@media screen and (max-width: 650px) {
  .simulator-btn {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 450px) {
  .simulator-btn {
    font-size: 0.5rem;
    padding: 0.4rem;
  }

  .simulator-card {
    width: 80vmin;
    height: calc(80vmin * 9 / 16);
  }

  .content-detail {
    margin-top: 2rem;
  }
}
</style>
