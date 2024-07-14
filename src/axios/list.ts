import axios from 'axios';

interface List {
  _id: string;
  userId: string;
  listName: string;
  createdDate: string;
  order: number;
  gameCount: number;
  __v: number;
}

export const getAllLists = (userId: string): Promise<List[] | void> => {
  const src = 'http://localhost:5000/apiList/getAll';
  const params = {
    userId,
  };

  return axios
    .get(src, { params })
    .then((data) => {
      const allLists = data.data.allLists;
      //? convert object to string: JSON.stringify
      localStorage.setItem('allLists', JSON.stringify(allLists));
      return allLists;
    })
    .catch((error) => {
      console.error('Error fetching data (getAllLists):', error);
    });
};
