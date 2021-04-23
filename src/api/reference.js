import axios from 'axios';

async function getLipstickListByImageRef(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('ref_face', form.fileUpload);   
  bodyFormData.append('user_id', form.userID);    
  const response = await axios.post('color/prediction', bodyFormData);    
  return response.data;
}

async function getMakeupDetailByImageRef(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('filename', form.filename);  
  // bodyFormData.append('blush_hex_color', form.blush_hex_color);    
  bodyFormData.append('blush_hex_color', '#7e554a');      
  const response = await axios.post('/v2/get/prediction/color', bodyFormData);    
  return response.data;
}

async function getCheekImage(form) {
  var bodyFormData = new FormData();  
  bodyFormData.append('ref_face', form.fileUpload);   
  // bodyFormData.append('user_id', form.userID);
  const response = await axios.post('/v2/get/cheek/image', bodyFormData, { responseType: "blob" });
  const filename = response.headers["x-suggested-filename"];
  // let headerLine1 = response.data.headers['content-disposition'];
  // const filename = contDis.split("=")[1]
  
  return {
    cheek_image: response.data,
    filename: filename,
  };
}

export {
  getLipstickListByImageRef,
  getCheekImage,
  getMakeupDetailByImageRef
};