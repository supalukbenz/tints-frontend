<template>
  <div class="loading">
    <slot></slot>
    <div class="loading-txt">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.loading {
  background: rgba(62, 66, 65, 0.65);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  filter: blur(0.1px);
}

.loading-txt {
  font-size: 2.5rem;
  color: #ffffff;
  letter-spacing: 3px;
  // animation: textclip 4s linear infinite;
  text-transform: uppercase;
}

@keyframes textclip {
  from {
    color: #a1afa0;
  }
  to {
    color: #edb194;
  }
}

.spinner {
  width: 3rem;
  height: 3rem;
  z-index: 120;
}
</style>
