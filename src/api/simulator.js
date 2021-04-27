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
  for (let i = 0; i <= 5; i++) {
    const response = await axios.post('simulator/lip', createFormData(form));
    if (response) {
      return response.data;
    }
  }
}

async function getBlushSimulator(form) {        
  for (let i = 0; i <= 5; i++) {
    const response = await axios.post('simulator/blush', createFormData(form));
    if (response) {
      return response.data;
    }
  }
}

async function getFoundationSimulator(form) {        
  for (let i = 0; i <= 5; i++) {
    const response = await axios.post('simulator/foundation', createFormData(form));
    if (response) {
      return response.data;
    }
  }
}

export {
  getLipSimulator,
  getBlushSimulator,
  getFoundationSimulator
};