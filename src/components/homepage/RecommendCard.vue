<template>
  <div class="recommend-container">
    <div class="recommend-detail">
      <div class="img-recommend-container">
        <img class="img-recommend" src="@/assets/images/recommendation/skin_rec.jpg" />
        <img class="img-recommend" src="@/assets/images/recommendation/blush_rec.jpeg" />
        <img class="img-recommend" src="@/assets/images/recommendation/lip_rec.jpg" />
      </div>
      <!-- <div class="img-container">
        <img class="img-user" src="@/assets/images/mockup/user.jpg" />
      </div> -->
      <div class="recommned-content">
        <div class="recommend-title">PRODUCTS ANALYZE & SUGGESTION</div>
        <div class="recommend-subtitle">
          " Suggest the product based on suitable colors for you by extracting their skin color and
          finding the tone of it "
        </div>
        <div class="recommend-btn-container">
          <router-link class="recommend-btn" to="/recommendation">Recommend</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Norican&display=swap');

.recommend-container {
  // background-image: url('../../assets/images/card/recommend-bg.png');
  // background-position: center;
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  background: #efe5e3;
  // height: calc(70vmin * 9 / 16);
  margin-top: 4rem;
}

.recommend-subtitle {
  // font-family: 'Norican', cursive;
  font-size: 0.9rem;
  padding: 1rem;
  border: 1px solid;
  margin: 0.5rem;
  // font-weight: 500;
}

.recommend-detail {
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  flex-direction: column;
}

.img-recommend-container {
  display: flex;
  justify-content: center;
}

.img-recommend {
  height: 24rem;
  max-width: 100%;
  margin: 0 1rem;
}

.img-user {
  height: calc(70vmin * 9 / 16);
}

.img-container {
  margin-right: 1rem;
}

.recommend-title {
  font-weight: 700;
  font-size: 1.7rem;
  color: #000;
}

.recommned-content {
  margin: 3rem 0rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.recommend-btn {
  border: none;
  background: #ffbec3;
  color: #ffffff;
  padding: 0.5rem 2rem;
  transition: all 0.2s;
  text-decoration: none;
  margin: 2rem 0;

  &:hover {
    background: #be8e92;
  }
}

.recommend-btn-container {
  margin: 2rem 0;
}

@media screen and (max-width: 980px) {
  .img-recommend {
    height: 22rem;
  }
}

@media screen and (max-width: 850px) {
  .img-recommend {
    height: 20rem;
  }
}

@media screen and (max-width: 780px) {
  .img-recommend {
    height: 17rem;
  }
}

@media screen and (max-width: 680px) {
  .img-recommend {
    height: 14rem;
    margin: 0 0.5rem;
  }
}

@media screen and (max-width: 540px) {
  .img-recommend {
    height: 10rem;
    margin: 0 0.5rem;
  }
}

@media screen and (max-width: 570px) {
  .recommend-title {
    font-size: 1rem;
  }
  .recommned-content {
    font-size: 0.7rem;
  }
  .recommend-btn-container {
    margin: 1rem 0;
  }
  .recommend-detail {
    padding: 0;
  }
}

@media screen and (max-width: 400px) {
  .img-recommend {
    height: 8rem;
    margin: 0 0.2rem;
  }
}
</style>
