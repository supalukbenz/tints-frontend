<template>
  <div class="makeup-ref-card">
    <img class="cosmetic-bg" src="@/assets/images/eyeshadow-pink.png" />
    <div class="ref-image-container">
      <div class="ref-img-card">
        <img id="ref-image" class="ref-img fadein" :src="require(`@/assets/images/${imgURL}`)" />
        <div class="ref-body">
          <div class="ref-detail">
            "Neques porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit..."
          </div>
          <div class="mt-5">
            <a class="makeup-ref-btn" href="">Makeup by Reference. </a>
          </div>
        </div>
      </div>
      <div class="ref-card-animate"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      imgURL: 'lisa.jpg',
    };
  },
  created() {
    var images = ['lisa-1.png', 'lisa-2.png', 'lisa.jpg'];
    var index = 0;

    setInterval(() => {
      $('#ref-image').fadeOut('slow', () => {
        this.imgURL = images[index];
        index++;
        if (index === images.length) {
          index = 0;
        }
        $('#ref-image').fadeIn('slow');
      });
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.makeup-ref-btn {
  font-size: 1.5rem;
  text-decoration: underline;
  color: #222;
}

.makeup-ref-bg {
  display: flex;
}

.makeup-ref-card {
  padding: 0 3rem;
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
