import axios from 'axios';

async function getUserRecommendation() {
  for (let i = 0; i <= 5; i++) {
    const response = await axios.get('get/recommendation');
    if (response) {
      return response.data;
    }
  }
}

export {
  getUserRecommendation
};