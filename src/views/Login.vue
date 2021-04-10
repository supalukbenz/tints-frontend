<template>
  <div class="login-container flex-center">
    <div class="wrapper">
      <div class="login-banner flex-center">Welcome</div>
      <div class="login-form flex-center">
        <div>
          <div class="input-form">
            <div class="email-title title-form">Email</div>
            <input type="email" class="email-form form-input" v-model="email" />
          </div>
          <div class="input-form">
            <div class="password-title title-form">Password</div>
            <input type="password" class="password-form form-input" v-model="password" />
          </div>
        </div>
        <div>
          <button type="button" class="login-btn">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
}
.login-container {
  margin: 2rem 0;
}

.wrapper {
  height: calc(80vmin * 9 / 16);
  display: flex;
  box-shadow: 0 1.25em 1em -0.5em #0005;
  border-radius: 1rem;
}

.login-banner {
  background: #edb194;
  color: #ffffff;
  height: 100%;
  width: 30vmin;
  border-radius: 1rem 0 0 1rem;
}

.login-form {
  height: 100%;
  width: 50vmin;
  background: #fff;
  border-radius: 0 1rem 1rem 0;
  flex-direction: column;
}

.login-btn {
  margin-top: 2rem;
  border: none;
  background: #edb194;
  color: #ffffff;
  border-radius: 20rem;
  font-size: 0.9rem;
  padding: 0.4rem 4rem;
}

.form-input {
  border: none;
  border-bottom: 1px solid #2c3e50;
  width: 13rem;
}

.input-form {
  margin: 1rem 0;
  font-size: 0.8rem;
}

.form-input:focus {
  border-color: #edb194;
  color: #edb194 !important;
}

.title-form {
  text-align: left;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
