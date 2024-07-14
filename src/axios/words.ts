import axios from 'axios';

export const getAllWords = (allListsId: []) => {
  const src = 'http://localhost:5000/apiWord/getAll';

  const params = {
    allListsId,
  };

  return axios
    .get(src, { params })
    .then((data) => {
      const Allwords = data.data.Allwords;
      //? convert object to string: JSON.stringify

      localStorage.setItem('Allwords', JSON.stringify(Allwords));

      return Allwords;
    })
    .catch((error) => {
      console.error('Error fetching data (getAllListWords):', error);
    });
};
