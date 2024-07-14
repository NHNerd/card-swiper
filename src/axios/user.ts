import axios from 'axios';

export const getUserId = (email: string): Promise<string | void> => {
  const src = 'http://localhost:5000/apiUser/userData';
  const params = { email: email };
  return axios
    .get(src, { params })
    .then((data) => {
      localStorage.setItem('userId', data.data._id);
      return data.data._id;
    })
    .catch((error) => {
      console.error('Error fetching data (getUserId):', error);
    });
};
