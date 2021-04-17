<template>
  <div class="question-part">
    <div class="question-title">Foundation questionnaire</div>
    <div class="question-desctipt">Select the foundation/concealer you’ve used before</div>
    <div class="form-display" v-show="!neverOption">
      <div v-for="(n, index) in foundationFormNumber" :key="index">
        <div v-if="index > 0" class="cancel-form">
          <a @click="removeFoundationForm(index)" class="cancel-txt">- remove</a>
        </div>
        <FoundationForm :neverOption="neverOption" class="fadeIn"></FoundationForm>
        <hr />
      </div>
      <div class="add-foundation-part">
        <a @click="handleAddFoundationForm" class="add-foundation-btn">+ Add another foundation</a>
      </div>
    </div>
    <div class="alert alert-secondary alert-txt" role="alert">
      <input
        class="form-check-input checkbox"
        type="checkbox"
        id="inlineCheckbox1"
        value="option1"
        v-model="neverOption"
      />
      Never used a foundation/There is no foundation used in the options.
    </div>
    <div class="btn-feature">
      <button class="next-btn" @click="handleNextState" type="button">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import FoundationForm from '@/components/register/FoundationForm.vue';
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
  components: {
    FoundationForm,
  },
  data() {
    return {
      foundationFormNumber: [1],
      neverOption: false,
    };
  },
  computed: {
    ...mapGetters({ userRegisInfo: 'getUserRegisterInfo' }),
  },
  methods: {
    handleAddFoundationForm() {
      this.foundationFormNumber.push(1);
    },
    removeFoundationForm(index) {
      this.foundationFormNumber.splice(index, 1);
    },
    handleNextState() {},
  },
  watch: {
    neverOption() {
      $('.form-display').addClass('transformTop');
      $('.alert-txt').addClass('transformTop');
      setTimeout(function() {
        $('.form-display').removeClass('transformTop');
        $('.alert-txt').removeClass('transformTop');
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
input,
button,
a {
  outline: none;
}

.alert-txt {
  font-size: 0.8rem;
  font-weight: 800;
  margin-top: 1.5rem;
  width: 32rem;
}

.question-part {
  padding: 2rem 3rem;
}

.question-title {
  font-size: 1.2rem;
  color: #edb194;
  font-weight: 800;
}

.btn-feature {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.next-btn {
  background: #edb194;
  color: #ffffff;
  font-weight: 800;
  border: none;
  padding: 0.3rem 2rem;
  border-radius: 10rem;
  font-size: 0.9rem;
}

.next-btn:hover {
  background: #d29e85;
}

.question-desctipt {
  font-size: 0.9rem;
}

.cancel-form {
  display: flex;
  justify-content: flex-end;
}

.cancel-txt {
  font-size: 0.8rem;
  color: #a83f39;
  cursor: pointer;
}

.add-foundation-part {
  display: flex;
  justify-content: flex-end;
}

.add-foundation-btn {
  cursor: pointer;
  color: #edb194;
  font-size: 0.9rem;
}

.transformTop {
  // transition: transform 1s ease-in-out;
  // animation: 0.5s slide-left;
  animation: slide-in 0.5s forwards;
  -webkit-animation: slide-in 0.5s forwards;
}

.transformDown {
  // transition: transform 1s ease-in-out;
  // animation: 0.5s slide-left;
  animation: slide-out 0.5s forwards;
  -webkit-animation: slide-out 0.5s forwards;
}

@keyframes slide-in {
  0% {
    -webkit-transform: translateY(100%);
  }
  100% {
    -webkit-transform: translateY(0%);
  }
}

@keyframes slide-out {
  0% {
    -webkit-transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(100%);
  }
}

@media screen and (max-width: 850px) {
  .question-part {
    padding: 2rem;
  }
  .alert-txt {
    width: 100% !important;
  }
}

@media screen and (max-width: 800px) {
  .question-part {
    padding: 2rem 1rem;
  }
  .alert-txt {
    width: 100% !important;
  }
}

@media screen and (max-width: 750px) {
  .question-part {
    padding: 1.5rem 0.5rem;
  }
  .alert-txt {
    width: 100% !important;
  }
  .add-foundation-btn {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 650px) {
  .question-title {
    font-size: 1rem;
  }
  .question-desctipt {
    font-size: 0.8rem;
  }
  .add-foundation-btn {
    font-size: 0.7rem;
  }
  .alert-txt {
    width: 100% !important;
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 450px) {
  .question-part {
    padding: 0rem;
  }
  .question-title {
    font-size: 0.8rem;
  }
  .question-desctipt {
    font-size: 0.6rem;
  }
  .add-foundation-btn {
    font-size: 0.6rem;
  }
  .alert-txt {
    width: 100% !important;
    font-size: 0.6rem;
  }
}
</style>
