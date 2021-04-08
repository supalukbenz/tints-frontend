import axios from 'axios';

async function getLipSimulator(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('user_image', form.fileUpload);
  bodyFormData.append('user_id', form.userID);
  bodyFormData.append('r_value', form.r_value);
  bodyFormData.append('g_value', form.g_value);
  bodyFormData.append('b_value', form.b_value);

  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  const response = await axios.post('simulator/lip', bodyFormData);
  return response.data;
}

async function getBlushSimulator(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('user_image', form.fileUpload);
  bodyFormData.append('user_id', form.userID);
  bodyFormData.append('r_value', form.r_value);
  bodyFormData.append('g_value', form.g_value);
  bodyFormData.append('b_value', form.b_value);

  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  const response = await axios.post('simulator/blush', bodyFormData);
  return response.data;
}

export {
  getLipSimulator,
  getBlushSimulator,
};