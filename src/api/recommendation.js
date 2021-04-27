import axios from 'axios';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getUserRecommendation() {
  for (let i = 0; i <= 10; i++) {    
    try {
      const response = await axios.get('get/recommendation');      
      if (response.status === 200) {      
        return response.data;
      }
      await sleep(3000);
    } catch (err) {
      console.log('recommendation running...');
    }
  }
  return;
}

export {
  getUserRecommendation
};