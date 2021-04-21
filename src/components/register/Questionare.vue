<template>
  <div class="question-part">
    <div class="question-title">Foundation questionnaire</div>
    <div class="question-desctipt">Select the foundation/concealer you’ve used before</div>
    <div class="form-display" v-show="!neverOption">
      <div v-for="(n, index) in foundationFormNumber" :key="index">
        <div v-if="index > 0" class="cancel-form">
          <a @click="removeFoundationForm(index)" class="cancel-txt">- remove</a>
        </div>
        <FoundationForm
          :clickedNextState="clickedNextState"
          :neverOption="neverOption"
          class="fadeIn"
        ></FoundationForm>
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
      <button
        v-show="!neverOption"
        data-toggle="modal"
        data-target="#submitModal"
        class="next-btn"
        @click="handleNextState"
        type="button"
      >
        Next <i class="fas fa-chevron-right"></i>
      </button>
      <button
        v-show="neverOption"
        class="next-btn"
        @click="handleNextStateNoneOption"
        type="button"
      >
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div
      class="modal fade"
      id="submitModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Confirm foundation information
            </h5>
            <button
              @click="handleEditFoundationList"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-show="foundationList.length === 0">--None--</div>
            <div v-show="foundationList.length !== 0">
              <div v-for="(foundation, index) in foundationList" :key="index">
                <div class="confirm-container">
                  <div class="confirm-item">
                    <div class="confirm-detail">Brand:</div>
                    {{ foundation.brandSelected }}
                  </div>
                  <div class="confirm-item">
                    <div class="confirm-detail">Product:</div>
                    {{ foundation.productSelected }}
                  </div>
                  <div class="confirm-item">
                    <div class="confirm-detail">Color:</div>
                    {{ foundation.colorSelected }}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="handleEditFoundationList"
              type="button"
              class="btn btn-edit"
              data-dismiss="modal"
            >
              Edit
            </button>
            <button
              @click="handleConfirmFoundation"
              type="button"
              class="btn btn-save-change"
              data-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
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
      clickedNextState: false,
    };
  },
  computed: {
    ...mapGetters({
      userRegisInfo: 'getUserRegisterInfo',
      foundationList: 'getFoundationFormList',
    }),
  },
  methods: {
    handleAddFoundationForm() {
      this.foundationFormNumber.push(1);
    },
    removeFoundationForm(index) {
      this.foundationFormNumber.splice(index, 1);
    },
    handleNextState() {
      this.clickedNextState = true;
    },
    async handleEditFoundationList() {
      let arrEmpty = this.foundationList;
      arrEmpty.splice(0, arrEmpty.length);
      await this.$store.dispatch('updateFoundationFormList', arrEmpty);
      this.clickedNextState = false;
    },
    handleConfirmFoundation() {
      let updateUser = this.userRegisInfo;
      updateUser.foundationList = this.foundationList;
      this.$store.dispatch('updateUserRegisterInfo', updateUser);
      this.$store.dispatch('updateRegisterState', 3);
    },
    handleNextStateNoneOption() {
      this.handleConfirmFoundation();
    },
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

.btn-save-change {
  font-size: 0.9rem;
  background: #9dc99c;
  color: #ffffff;
  font-weight: 800;
}

.btn-edit {
  background: #6c757d;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
}

.confirm-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.confirm-item {
  display: flex;
  flex-direction: row;
}

.confirm-detail {
  font-weight: 700;
  color: #edb194;
  padding-right: 0.5rem;
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

  .btn-save-change,
  .btn-edit,
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
  .modal-title,
  .modal-body {
    font-size: 0.9rem !important;
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
  .modal-body {
    font-size: 0.7rem !important;
  }
}
</style>
