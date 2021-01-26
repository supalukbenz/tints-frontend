import axios from 'axios';

async function getLipstickListByImageRef(form) {  
  var bodyFormData = new FormData();
  bodyFormData.append('ref_face', form);   
  const response = await axios.post('prediction/lipstick/', bodyFormData);
  return response.data;
}

export {
  getLipstickListByImageRef,
};