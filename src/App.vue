<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/main/Navbar.vue';
import Footer from '@/components/main/Footer.vue';
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html,
body {
  background-color: #fffcf7 !important;
  // background-image: url('../src/assets/images/blush-bg.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

button {
  outline: none;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.color-green-200 {
  color: #a1afa0;
}

.color-green-100 {
  color: #9dc99c;
}

.color-brown-100 {
  color: #bca79d;
}

.color-skin-100 {
  color: #edb194;
}

.bg-green-200 {
  background: #a1afa0;
}

.bg-green-100 {
  background: #9dc99c;
}

.bg-brown-100 {
  background: #bca79d;
}

.bg-skin-100 {
  background: #edb194;
}

.ref-feature {
  margin: 1rem 0.5rem;
  border-left: 2px solid #cfcfcf;
}

.heart-gray {
  color: #cfcfcf;
}

.heart-red {
  color: #a83f39;
}

.border-red {
  border-color: #a83f39 !important;
}

.border-gray {
  border-color: #cfcfcf !important;
}

.like-btn {
  border-radius: 50%;
  // margin-left: 0.5rem;
  border: 1px solid;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: #a83f39 !important;
    .like-icon {
      color: #a83f39;
    }
  }
}
.fadeIn {
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
}

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
</style>
