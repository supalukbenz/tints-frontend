import axios from 'axios';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
  bodyFormData.append('blush_hex_color', form.blush_hex_color);
  for (let i = 0; i <= 10; i++) {
    try {
      const response = await axios.post('/v2/get/prediction/color', bodyFormData);
      if (response.status == 200) {
        return response.data;
      }
      await sleep(2000);
    } catch (err) {
      console.log('makeup reference running...');
    }  
  }
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