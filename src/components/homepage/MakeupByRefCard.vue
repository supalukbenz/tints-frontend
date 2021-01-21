<template>
  <div class="makeup-ref-card">
    <!-- <img class="cosmetic-bg" src="@/assets/images/eyeshadow-pink.png" /> -->
    <div class="ref-image-container">
      <div class="ref-img-card">
        <img id="ref-image" class="ref-img fadeIn" :src="require(`@/assets/images/${imgURL}`)" />
        <div class="ref-body text-start">
          <div class="ref-detail">
            "Neques porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit..."
          </div>
          <div class="mt-1 w-100 d-flex">
            <!-- <button type="button" class="makeup-ref-btn" href="">Makeup by Reference.</button> -->

            <router-link class="makeup-btn" to="/makeup-ref"
              ><span>Makeup by Reference. <i class="fas fa-arrow-right next-icon"></i></span
            ></router-link>
          </div>
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
.makeup-btn {
  width: 13rem;
  padding: 0.5rem;
  color: #ffffff;
  background: #f6aaaf;
  text-align: left;
  position: relative;
  transition: all 0.35s;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -o-transition: all 0.35s;
  -ms-transition: all 0.35s;
  text-decoration: none;
}

.makeup-btn span {
  position: relative;
  z-index: 2;
}

.makeup-btn:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #be5887;
  transition: all 0.35s;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -o-transition: all 0.35s;
  -ms-transition: all 0.35s;
}

.makeup-btn:hover {
  color: #fff;
}

.makeup-btn:hover:after {
  width: 100%;
}

.makeup-ref-btn {
  background: #be5887;
  border: none;
  color: #ffffff;
  font-weight: 500;
  padding: 0rem 1rem;
}

.makeup-ref-bg {
  display: flex;
}

.makeup-ref-card {
  padding: 3rem;
}

.fadeIn {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.cosmetic-bg {
  height: 30rem;
  margin-bottom: -23rem;
}

.ref-detail {
  overflow: hidden;
}

.ref-body {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;
  text-align: left;
}
.ref-image-container {
  position: relative;
  width: 90vmin;
  height: calc(90vmin * 9 / 16);
  margin: auto;
  overflow: hidden;
  // box-shadow: 0 1.25em 1em -0.5em #0005;
}

.ref-img-card {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 230, 236, 0.8);
}

.ref-img {
  display: flex;
  height: 100%;
  object-fit: contain;
  object-position: 0% 50%;
  transition: transform 1s;

  .ref-image-container:hover & {
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

  .ref-image-container:hover & {
    animation-name: move-x;
  }
}

.ref-card-animate {
  z-index: 2;
  width: 10vmin;
  right: 100%;
  background-color: rgba(250, 230, 236, 1);
  animation-delay: 0.1s;

  --x1: 0;
  --x2: 95%;
}

@media screen and (max-width: 892px) {
  .makeup-ref-card {
    padding: 1rem;
  }

  .ref-body {
    padding: 0.5rem;
  }

  .cosmetic-bg {
    height: 12rem;
    margin-bottom: 0rem;
  }
}
</style>
