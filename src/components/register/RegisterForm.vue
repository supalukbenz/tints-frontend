<template>
  <div class="register-form-container">
    <div class="register-txt">Register</div>
    <div class="email-form form-container">
      <div class="title-input">Email</div>
      <input
        type="email"
        v-model="email"
        :class="{ borderRed: clickedRegisState && email === '', colorRed: emailInvalidType }"
        class="email-input form-input"
        placeholder="example@email.com"
        @blur="checkEmailInput(email)"
        required
      />
    </div>
    <div class="password-form form-container">
      <div class="title-input">
        Password
        <span v-show="passwordInput && samePasswordState">
          <i class="fas fa-check check-icon"></i>
        </span>
        <span v-show="passwordInput && !samePasswordState">
          <i class="fas fa-times time-icon"></i>
        </span>
      </div>
      <input
        type="password"
        v-model="password"
        :class="{ borderRed: clickedRegisState && password === '' }"
        class="email-input form-input"
      />
    </div>
    <div class="password-form form-container">
      <div class="title-input">
        Repeat password
        <span v-show="passwordInput && samePasswordState">
          <i class="fas fa-check check-icon"></i>
        </span>
        <span v-show="passwordInput && !samePasswordState">
          <i class="fas fa-times time-icon"></i>
        </span>
      </div>
      <input
        type="password"
        v-model="rePassword"
        :class="{ borderRed: clickedRegisState && rePassword === '' }"
        class="email-input form-input"
      />
    </div>
    <div v-show="emailExistState" class="alert-txt">* Email already exist</div>
    <div v-show="emailInvalidType" class="alert-txt">* Invalid email</div>
    <div class="btn-feature">
      <button @click="handleRegister" class="next-btn" type="button">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { checkEmailExist } from '@/api/authentication';

export default {
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      samePasswordState: false,
      passwordInput: false,
      clickedRegisState: false,
      emailExistState: false,
      emailInvalidType: false,
    };
  },
  methods: {
    validateEmail(email) {
      var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(String(email).toLowerCase());
    },
    checkEmailInput(email) {
      if (!this.validateEmail(email)) {
        this.emailInvalidType = true;
      }
    },
    async handleRegister() {
      this.clickedRegisState = true;
      if (
        this.email.trim() !== '' &&
        this.password !== '' &&
        this.rePassword !== '' &&
        this.validateEmail(this.email) &&
        this.samePasswordState
      ) {
        try {
          await checkEmailExist(this.email);
          const user = {
            email: this.email.trim(),
            password: this.password,
          };
          this.$store.dispatch('updateUserRegisterInfo', user);
          this.$store.dispatch('updateRegisterState', 2);
        } catch (err) {
          this.emailExistState = true;
        }
      }
    },
  },
  watch: {
    rePassword(val) {
      if (val) {
        this.passwordInput = true;
        if (this.rePassword === this.password) {
          this.samePasswordState = true;
        } else {
          this.samePasswordState = false;
        }
      } else {
        this.passwordInput = false;
        this.samePasswordState = false;
      }
    },
    email() {
      this.emailExistState = false;
      this.emailInvalidType = false;
    },
  },
};
</script>

<style lang="scss" scoped>
input,
button {
  outline: none;
}

.borderRed {
  border-color: #a83f39 !important;
}

.colorRed {
  color: #a83f39;
}

.alert-txt {
  color: #a83f39;
  font-weight: 800;
  font-size: 0.9rem;
}

.register-form-container {
  padding: 2rem 4rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}

.title-input {
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.register-txt {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #edb194;
  letter-spacing: 1px;
}

.next-btn {
  background: #edb194;
  color: #ffffff;
  font-weight: 800;
  border: none;
  padding: 0.3rem 2rem;
  border-radius: 10rem;
  font-size: 0.8rem;
}

.form-input {
  border: none;
  border-bottom: 1px solid #2c3e50;
  font-size: 0.9rem;
  padding: 0.1rem 0.4rem;
  width: 15rem;
}

.check-icon {
  color: #28a745;
  margin-left: 0.2rem;
}

.time-icon {
  color: #a83f39;
  margin-left: 0.2rem;
}

.btn-feature {
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 650px) {
  .form-input {
    width: 12rem;
    font-size: 0.8rem;
  }
  .register-form-container {
    padding: 1rem 3rem;
  }
}

@media screen and (max-width: 450px) {
  .form-input {
    width: 10rem;
  }
  .register-form-container {
    padding: 1rem;
  }
}
</style>
