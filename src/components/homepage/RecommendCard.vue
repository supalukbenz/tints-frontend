<template>
  <div class="recommend-container">
    <div class="recommend-detail">
      <div class="img-container">
        <img class="img-user" src="@/assets/images/mockup/user.jpg" />
      </div>
      <div class="recommned-content">
        <div class="recommend-title">ANALYZE & RECOMMEND</div>
        <div class="recommend-subtitle">the perfect makeup tone for you</div>
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
.recommend-container {
  // background-image: url('../../assets/images/card/recommend-bg.png');
  // background-position: center;
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  background: #efe5e3;
  height: calc(70vmin * 9 / 16);
  margin-top: 4rem;
}

.recommend-detail {
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  text-align: right;
}

.img-user {
  height: calc(70vmin * 9 / 16);
}

.img-container {
  margin-right: 1rem;
}

.recommned-content {
  margin-left: 1rem;
}

.recommend-title {
  font-weight: 700;
  font-size: 1.7rem;
  color: #000;
}

.recommned-content {
  margin-top: 2rem;
  display: flex;
  align-items: flex-end;
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
</style>
