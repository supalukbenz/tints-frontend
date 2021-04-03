<template>
  <div class="bar-container">
    <div class="progress-point">
      <div
        @click="handleChangeState(0)"
        class="circle"
        :class="{ bgSelectedState: state === 0 || state === 1 || state === 2 }"
      ></div>
    </div>
    <div class="progrss-line" :class="{ bgSelectedState: state === 1 || state === 2 }"></div>
    <div class="progress-point">
      <div
        @click="handleChangeState(1)"
        class="circle"
        :class="{ bgSelectedState: state === 1 || state === 2, disbledButton: state < 1 }"
      ></div>
    </div>
    <div class="progrss-line" :class="{ bgSelectedState: state === 2 }"></div>
    <div class="progress-point">
      <div
        @click="handleChangeState(2)"
        class="circle"
        :class="{ bgSelectedState: state === 2, disbledButton: state < 2 }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Number,
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

.progress-point {
  display: flex;
  flex-direction: column;
}

.progress-step {
  font-size: 0.5rem;
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
