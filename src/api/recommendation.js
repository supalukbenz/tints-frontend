import axios from 'axios';


async function getUserRecommendation() {        
  const response = await axios.get('get/recommendation');
  return response.data;
}

export {
  getUserRecommendation
};