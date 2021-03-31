import axios from 'axios';

async function getLipSimulator(form) {        
  var bodyFormData = new FormData();
  bodyFormData.append('user_image', form.fileUpload);
  // bodyFormData.append('user_image_1', form.fileUpload);
  // bodyFormData.append('user_image_2', form.fileUpload);  
  bodyFormData.append('user_id', form.userID);
  bodyFormData.append('rlip', form.rlip);
  bodyFormData.append('glip', form.glip);
  bodyFormData.append('blip', form.blip);

  // const response = await axios.post('simulator/lip', bodyFormData, { responseType: "blob" });
  const response = await axios.post('simulator/lip', bodyFormData);
  return response.data;
}

export {
  getLipSimulator,
};