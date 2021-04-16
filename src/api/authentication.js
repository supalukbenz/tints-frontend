import axios from 'axios';

async function userLogin(form) {
  var bodyFormData = new FormData();
  bodyFormData.append('email', form.email);
  bodyFormData.append('password', form.password);
  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  const response = await axios.post('auth/login', bodyFormData);
  return response.data;
}

export {
  userLogin,
};