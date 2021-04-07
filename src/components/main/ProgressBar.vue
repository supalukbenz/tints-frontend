<template>
  <div class="bar-container">
    <div class="progress-point">
      <div
        @click="handleChangeState(0)"
        class="circle"
        :class="{ bgSelectedState: state === 0 || state === 1 || state === 2 }"
      >
        <div
          class="progress-detail"
          :class="{ colorSelectedState: state === 0 || state === 1 || state === 2 }"
        >
          select image
        </div>
      </div>
    </div>
    <div class="progrss-line" :class="{ bgSelectedState: state === 1 || state === 2 }"></div>
    <div class="progress-point">
      <div
        @click="handleChangeState(1)"
        class="circle"
        :class="{ bgSelectedState: state === 1 || state === 2, disbledButton: state < 1 }"
      >
        <div class="progress-detail" :class="{ colorSelectedState: state === 1 || state === 2 }">
          upload image
        </div>
      </div>
    </div>
    <div
      v-if="predictionState"
      class="progrss-line"
      :class="{ bgSelectedState: state === 2 }"
    ></div>
    <div v-if="predictionState" class="progress-point">
      <div
        @click="handleChangeState(2)"
        class="circle"
        :class="{ bgSelectedState: state === 2, disbledButton: state < 2 }"
      >
        <div class="progress-detail" :class="{ colorSelectedState: state === 2 }">
          pick cheek color
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Number,
    predictionState: Boolean,
  },
  methods: {
    handleChangeState(nextState) {
      if (nextState < this.state) {
        this.$emit('handleChangeState', nextState);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-container {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.disbledButton {
  cursor: not-allowed !important;
}

.progrss-line {
  width: 5rem;
  height: 0.3rem;
  background: #e0dfdf;
  margin: 0 -0.1rem;
}

.bgSelectedState {
  background: #edb194 !important;
}

.colorSelectedState {
  color: #edb194 !important;
}

.progress-point {
  display: flex;
  flex-direction: column;
}

.progress-detail {
  font-size: 0.5rem;
  margin-top: 1.5rem;
  white-space: nowrap;
  margin-left: -1.2rem;
  color: #cfcccc;
}

.circle {
  z-index: 2;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: #e0dfdf;
  cursor: pointer;
}
</style>
