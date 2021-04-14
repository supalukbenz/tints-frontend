<template>
  <div class="ex-container">
    <div>
      <div class="upload-title condition-txt">&#11810; Example &#11813;</div>
      <img
        id="ex-image"
        class="ex-image fadeIn"
        :src="require(`@/assets/images/makeupRef/${imageExampleURL}`)"
        alt="exampleImageRef"
      />
    </div>
    <div class="condition-detail">
      <div class="mb-2">
        <i class="fas fa-check condition-icon"></i
        ><span class="condition-txt"> Clear facial structure </span>
      </div>
      <div>
        <i class="fas fa-check condition-icon"></i
        ><span class="condition-txt"> Bright and clear image </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageExampleURL: 'rihanna_ex.png',
    };
  },
  created() {
    // var images = ['ex_1.jpg', 'ex_2.jpg', 'ex_3.jpg', 'ex_7.jpg', 'rihanna_ex.png'];
    // var index = 0;
    // setInterval(() => {
    //   $('#ex-image').fadeOut('slow', () => {
    //     this.imageExampleURL = images[index];
    //     index++;
    //     if (index === images.length) {
    //       index = 0;
    //     }
    //     $('#ex-image').fadeIn('slow');
    //   });
    // }, 5000);
  },
};
</script>

<style lang="scss" scoped>
.ex-container {
  background: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 2px solid #dee2e6;
  // margin-left: 5rem;
}

.upload-title {
  // font-family: 'Yeseva One', cursive;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.ex-image {
  height: 20rem;
  max-width: 100%;
}

.condition-detail {
  text-align: left;
  margin-left: 1rem;
  margin-top: 1rem;
}

.condition-icon {
  color: #62dd49;
}

.condition-txt {
  color: #a0a0a0;
}

@media screen and (max-width: 662px) {
  .ex-container {
    padding: 1rem;
    margin: 0;
  }
  .upload-title {
    font-size: 0.9rem;
  }
  .condition-detail {
    font-size: 0.8rem;
  }
  .ex-image {
    height: 15rem;
  }
}
</style>
