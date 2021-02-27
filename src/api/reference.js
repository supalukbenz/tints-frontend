import axios from 'axios';

async function getLipstickListByImageRef(form) {      
  var bodyFormData = new FormData();
  bodyFormData.append('ref_face', form);    
  console.log('bodyFormData', form);
  const response = await axios.post('prediction/lipstick/', bodyFormData);
  console.log('response.data', response.data);
  return response.data;
}

export {
  getLipstickListByImageRef,
};