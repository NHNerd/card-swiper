import axios from 'axios';

export const getAllLists = (userId: string) => {
  const src = 'http://localhost:5000/apiList/getAll';
  const params = {
    userId,
  };

  axios
    .get(src, { params })
    .then((data) => {
      const allLists = data.data.allLists;
      //? convert object to string: JSON.stringify
      localStorage.setItem('allLists', JSON.stringify(allLists));
    })
    .catch((error) => {
      console.error('Error fetching data (getAllLists):', error);
    });
};
