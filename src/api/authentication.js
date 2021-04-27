import axios from 'axios';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function userLogin(form) {
  var bodyFormData = new FormData();
  bodyFormData.append('email', form.email);
  bodyFormData.append('password', form.password);    
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.post('auth/login', bodyFormData);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('login state running...');
    }
  }
  // const response = await axios.post('auth/login', bodyFormData);  
  // return response.data;
}

async function userResgister(form) {
  var bodyFormData = new FormData();
  bodyFormData.append('email', form.email);
  bodyFormData.append('password', form.password);
  bodyFormData.append('user_image', form.userImage);
  bodyFormData.append('foundation_list', form.foundationList);
  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.post('auth/signup', bodyFormData);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('signup state running...');
    }
  }
}

async function getUserInformation() {
  for (let i = 0; i <= 10; i++) {    
    try {      
      const response = await axios.get('auth/test/get/user_info/token');
      if (response.status === 200) {
        return response.data;
      }
      await sleep(4000);
    } catch (err) {
      console.log('update user infomation state running...');
    }
  }
}


async function userChangeImage(img) {
  var bodyFormData = new FormData();
  bodyFormData.append('user_image', img);
  await sleep(2000);
  for (let i = 0; i <= 10; i++) {
    try {
      // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
      const response = await axios.put('auth/change/user/image', bodyFormData);
      await sleep(4000);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('update user infomation state running...');
    }
  }
}

async function userChangePassword(form) {
  var bodyFormData = new FormData();
  bodyFormData.append('current_password', form.currentPassword);
  bodyFormData.append('new_password', form.newPassword);
  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.put('auth/change/password', bodyFormData);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('change password state running...');
    }
  }
}

async function checkEmailExist(email) {
  var bodyFormData = new FormData();  
  bodyFormData.append('email', email);  
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.post('check/email/exist', bodyFormData);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('check email state running...');
    }
  }
}

async function checkImageValid(img) {
  var bodyFormData = new FormData();  
  bodyFormData.append('user_image', img);      
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.post('auth/check/valid/user/image', bodyFormData);
      if (response.status === 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('image validation state running...');
    }
  }
}

export {
  userLogin,
  userResgister,
  userChangeImage,
  getUserInformation,
  userChangePassword,
  checkEmailExist,
  checkImageValid,
};