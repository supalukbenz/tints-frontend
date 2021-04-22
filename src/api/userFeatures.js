import axios from 'axios';

async function userLikedLipsticks(item) {        
  const response = await axios.post('user/liked/lipstick', item);
  return response.data;
}

async function userLikedBlush(item) {        
  const response = await axios.post('user/liked/blush', item);
  return response.data;
}

async function userLikedFoundation(item) {        
  const response = await axios.post('user/liked/foundation', item);
  return response.data;
}

async function userUnlikedLipsticks(item) {        
  const response = await axios.post('user/delete/liked/lipstick', item);
  return response.data;
}

async function userUnlikedBlush(item) {        
  const response = await axios.post('user/delete/liked/blush', item);
  return response.data;
}

async function userUnlikedFoundation(item) {        
  const response = await axios.post('user/delete/liked/foundation', item);
  return response.data;
}

export {
  userLikedLipsticks,
  userLikedBlush,
  userLikedFoundation,
  userUnlikedLipsticks,
  userUnlikedBlush,
  userUnlikedFoundation,
};