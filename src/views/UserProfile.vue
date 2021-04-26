<template>
  <div>
    <div class="user-profile-container">
      <div class="user-profile">User profile <i class="fas fa-user-circle"></i></div>
    </div>
    <div class="detail-container">
      <div class="profile-content">
        <img
          class="user-img"
          :src="convertBase64Image(getUserInfo.base64_user_image)"
          alt="UserImageProfile"
        />

        <div class="change-img-feature">
          <UploadImageModal class="change-img-btn" titleButton="Change image"></UploadImageModal>
        </div>
        <div class="user-detail">
          <div class="item first-index-title">Email</div>
          <div class="item first-index-item">
            <div class="user-email">
              {{ getUserInfo.email }}
            </div>
            <!-- <a class="edit-btn" data-toggle="modal" data-target="#changeEmailModal"
              ><i class="fas fa-edit"></i
            ></a> -->
          </div>
          <div class="item secound-title">Password</div>
          <div class="item secound-item">
            ***
            <a class="edit-btn" data-toggle="modal" data-target="#changePasswordModal"
              ><i class="fas fa-edit"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- change email modal -->
    <div
      class="modal fade"
      id="changeEmailModal"
      tabindex="-1"
      aria-labelledby="emailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="emailModalLabel">Change email</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="email-form">
              <div class="title-input email-input">
                Email
              </div>
              <div class="input-form">
                <input
                  :class="{ borderRed: submitEmailState && newEmailInput === '' }"
                  type="email"
                  placeholder="example@email.com"
                  v-model="newEmailInput"
                  class="email-input form-input"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <button type="button" @click="handleChangeEmail" class="btn btn-save-change">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- change password modal -->
    <div
      class="modal fade"
      id="changePasswordModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change password</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="password-form form-container">
              <div class="title-input">
                Password
              </div>
              <div class="input-form">
                <input
                  :class="{ borderRed: submitPasswordState && passwordInput === '' }"
                  type="password"
                  v-model="passwordInput"
                  class="email-input form-input"
                />
              </div>
            </div>
            <div class="password-form form-container">
              <div class="title-input">
                New password
              </div>
              <div class="input-form">
                <input
                  type="password"
                  v-model="newPassword"
                  class="email-input form-input"
                  :class="{ borderRed: submitPasswordState && newPassword === '' }"
                />
                <span v-show="sameNewPasswordState && newPasswordInput">
                  <i class="fas fa-check check-icon"></i>
                </span>
                <span v-show="!sameNewPasswordState && newPasswordInput">
                  <i class="fas fa-times time-icon"></i>
                </span>
              </div>
            </div>
            <div class="password-form form-container">
              <div class="title-input">
                Repear new password
              </div>
              <div class="input-form">
                <input
                  type="password"
                  v-model="reNewPassword"
                  class="email-input form-input"
                  :class="{ borderRed: submitPasswordState && reNewPassword === '' }"
                />
                <span v-show="sameNewPasswordState && newPasswordInput">
                  <i class="fas fa-check check-icon"></i>
                </span>
                <span v-show="!sameNewPasswordState && newPasswordInput">
                  <i class="fas fa-times time-icon"></i>
                </span>
              </div>
            </div>
            <span v-show="passwordIncorrect" class="alert-txt">* Your password is incorrect</span>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            <button type="button" @click="handleChangePassword" class="btn btn-save-change">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImageModal from '@/components/main/UploadImageModal.vue';
import $ from 'jquery';
import { mapGetters } from 'vuex';
import { userChangeImage, getUserInformation, userChangePassword } from '@/api/authentication';

export default {
  components: {
    UploadImageModal,
  },
  data() {
    return {
      passwordInput: '',
      newPassword: '',
      reNewPassword: '',
      submitPasswordState: '',
      newEmailInput: '',
      sameNewPasswordState: false,
      submitEmailState: false,
      newPasswordInput: false,
      passwordIncorrect: false,
    };
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getImageUpload', 'getFileUpload']),
  },
  methods: {
    async handleChangePassword() {
      this.submitPasswordState = true;
      this.passwordIncorrect = false;
      if (
        this.passwordInput.trim() === '' ||
        this.newPassword.trim() === '' ||
        this.reNewPassword.trim() === ''
      ) {
        return;
      }
      if (this.sameNewPasswordState) {
        const form = {
          currentPassword: this.passwordInput,
          newPassword: this.newPassword,
        };

        try {
          await userChangePassword(form);

          const updateUser = await getUserInformation();
          await this.$store.dispatch('updateUserInfo', updateUser);

          this.passwordInput = '';
          this.newPassword = '';
          this.reNewPassword = '';
          this.submitPasswordState = false;
          this.passwordIncorrect = false;
          this.newPasswordInput = false;
          $('#changePasswordModal').modal('hide');
        } catch (err) {
          this.sameNewPasswordState = false;
          this.newPassword = '';
          this.reNewPassword = '';
          this.passwordIncorrect = true;
          this.passwordInput = '';
        }
      }
    },
    async handleChangeEmail() {
      this.submitEmailState = true;
      if (this.newEmailInput.trim() === '') {
        return;
      } else {
        let updateUser = this.getUserInfo;
        updateUser.email = this.newEmailInput;

        await this.$store.dispatch('updateUserProfile', updateUser);
        this.newEmailInput = '';
        this.submitEmailState = false;
        $('#changeEmailModal').modal('hide');
      }
    },
    convertBase64Image(base64) {
      if (base64) {
        return `data:image/png;base64, ${base64}`;
      }
    },
  },
  watch: {
    getImageUpload: {
      async handler(val) {
        if (val) {
          await userChangeImage(this.getFileUpload);
          const updateUser = await getUserInformation();
          await this.$store.dispatch('updateUserInfo', updateUser);
        }
      },
      deep: true,
    },
    reNewPassword(val) {
      if (val) {
        this.newPasswordInput = true;
        if (this.newPassword === this.reNewPassword) {
          this.sameNewPasswordState = true;
        } else {
          this.sameNewPasswordState = false;
        }
      } else {
        this.newPasswordInput = false;
        this.sameNewPasswordState = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input,
button {
  outline: none;
}

.alert-txt {
  color: #a83f39;
  font-size: 0.8rem;
}

.btn-save-change {
  font-size: 0.9rem;
  background: #ac6f63;
  color: #ffffff;
  font-weight: 800;
}

.borderRed {
  border-color: #a83f39 !important;
}

.check-icon {
  color: #28a745;
  margin-left: 0.2rem;
}

.time-icon {
  color: #a83f39;
  margin-left: 0.2rem;
}

.user-profile-container {
  display: flex;
  justify-content: flex-start;
}

.user-profile {
  font-size: 1.4rem;
  font-weight: 800;
  padding: 0.5rem 2rem;
  padding-right: 1rem;
  background: #edb194;
  color: #ffffff;
}

.change-img-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.detail-container {
  // background: #eceaea;
  padding: 4rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.email-form {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.user-img {
  height: 20rem;
  max-width: 100%;
  margin-top: -2rem;
}

.profile-content {
  width: fit-content;
  border: 1px solid #cfcfcf;
  background: #ffffff;
}

.user-detail {
  display: grid;
  justify-content: center;
  margin: 3rem 1rem;
  grid-template-columns: 10rem 20rem;
  text-align: left;
}

.item-detail {
  display: flex;
  flex-direction: row;
}

.item {
  padding-right: 1rem;
  background: #ffffff;
  padding: 1rem;
}

.first-index-title {
  font-weight: 700;
  grid-column: 1 / 2;
  border: 1px solid #cfcfcf;
  border-bottom: none;
}

.first-index-item {
  grid-column: 2 / 3;
  display: flex;
  border-top: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  justify-content: space-between;
}

.secound-item {
  grid-area: 2 / 2 / 3 / 3;
  border-top: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  display: flex;
  justify-content: space-between;
}

.third-item {
  grid-area: 3 / 2 / 4 / 3;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
}

.third-title {
  font-weight: 700;
  grid-area: 3 / 1 / 4 / 2;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
}

.secound-title {
  font-weight: 700;
  grid-area: 2 / 1 / 3 / 2;
  border: 1px solid #cfcfcf;
}

.user-item {
  border: 2px solid #cfcfcf;
  padding: 2rem;
  background: #ffffff;
}

.user-email {
  overflow: hidden;
}

.edit-btn {
  cursor: pointer;
  color: #ac6f63;
}
.edit-title {
  font-size: 0.9rem;
}

.form-container {
  // display: flex;
  // flex-direction: row;
  // align-items: flex-start;
  display: grid;
  margin-bottom: 1.2rem;
  text-align: left;
  grid-template-columns: 12rem 14rem;
  justify-content: center;
  align-items: end;
}

.title-input {
  font-size: 0.9rem;
}

.form-input {
  border: none;
  border-bottom: 1px solid #2c3e50;
  font-size: 0.9rem;
  padding: 0.1rem 0.4rem;
  width: 15rem;
}

.input-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.email-input {
  margin-right: 1rem;
}

@media screen and (max-width: 750px) {
  .user-detail {
    font-size: 0.8rem;
    grid-template-columns: 8rem 17rem;
  }
  .modal-title {
    font-size: 1.1rem;
  }
  .btn-save-change {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 662px) {
  .user-img {
    height: 15rem;
  }
  .user-detail {
    font-size: 0.8rem;
    margin: 3rem 1rem;
    grid-template-columns: 7rem 15rem;
  }

  .form-container {
    grid-template-columns: 11rem 13rem;
  }

  .title-input {
    font-size: 0.8rem;
  }
  .form-input {
    width: 13rem;
  }
  .user-profile-container {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 500px) {
  .user-img {
    height: 12rem;
  }
  .user-detail {
    font-size: 0.7rem;
    margin: 3rem 1rem;
    grid-template-columns: 6rem 13rem;
  }

  .form-container {
    grid-template-columns: 7rem 12rem;
  }
  .form-input {
    width: 11rem;
    font-size: 0.8rem;
  }
  .user-profile-container {
    font-size: 1.2rem;
  }
}
</style>
