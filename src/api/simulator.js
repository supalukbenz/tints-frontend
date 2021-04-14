import axios from 'axios';

function createFormData(form) {
  var bodyFormData = new FormData();
  bodyFormData.append('user_image', form.fileUpload);
  bodyFormData.append('user_id', form.userID);
  bodyFormData.append('r_value', form.r_value);
  bodyFormData.append('g_value', form.g_value);
  bodyFormData.append('b_value', form.b_value);
  return bodyFormData
}

async function getLipSimulator(form) {        

  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  const response = await axios.post('simulator/lip', createFormData(form));
  return response.data;
}

async function getBlushSimulator(form) {        
  
  const response = await axios.post('simulator/blush', createFormData(form));
  return response.data;
}

async function getFoundationSimulator(form) {        

  const response = await axios.post('simulator/foundation', createFormData(form));
  return response.data;
}

export {
  getLipSimulator,
  getBlushSimulator,
  getFoundationSimulator
};