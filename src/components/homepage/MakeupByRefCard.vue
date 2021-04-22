<template>
  <div class="makeup-ref-container">
    <div class="makeup-ref-card">
      <div class="model-container">
        <img
          id="ref-image"
          class="ref-img fadeIn"
          :src="require(`@/assets/images/card/${imgURL}`)"
          alt="MakeUpRefCard"
        />
      </div>
      <div class="content-container">
        <div class="content-detail">
          <router-link class="makeup-ref-btn" to="/makeup-ref">Makeup By Reference</router-link>
        </div>
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
.makeup-ref-container {
  display: flex;
  justify-content: center;
  margin: 4rem;
  background: #f2e4dc;
}
.makeup-ref-card {
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

.makeup-ref-btn {
  border: none;
  background: #9dc99c;
  color: #ffffff;
  padding: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: #698868;
  }
}

.ref-img {
  height: 100%;
  width: 100%;
}

.content-container {
  background-image: url('../../assets/images/card/makeup_ref-card.png');
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

  .makeup-ref-card:hover & {
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

  .makeup-ref-card:hover & {
    animation-name: move-x;
  }
}

.ref-card-animate {
  z-index: 2;
  width: 10vmin;
  right: 100%;
  background-color: rgba(162, 176, 160, 0.8);
  animation-delay: 0.1s;

  --x1: 0;
  --x2: 95%;
}

@media screen and (max-width: 800px) {
  .makeup-ref-container {
    margin: 3rem;
  }
}

@media screen and (max-width: 650px) {
  .makeup-ref-btn {
    font-size: 0.8rem;
  }
  .makeup-ref-container {
    margin: 2rem;
  }
}

@media screen and (max-width: 450px) {
  .makeup-ref-btn {
    font-size: 0.5rem;
    padding: 0.4rem;
  }

  .makeup-ref-card {
    width: 80vmin;
    height: calc(80vmin * 9 / 16);
  }

  .content-detail {
    margin-top: 2rem;
  }
  .makeup-ref-container {
    margin: 1rem;
  }
}
</style>
