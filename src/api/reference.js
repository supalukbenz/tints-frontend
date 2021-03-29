import axios from 'axios';

async function getLipstickListByImageRef(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('ref_face', form.fileUpload);   
  bodyFormData.append('user_id', form.userID);    
  const response = await axios.post('color/prediction', bodyFormData);    
  return response.data;
}

export {
  getLipstickListByImageRef,
};