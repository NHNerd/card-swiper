import axios from 'axios';
import API_URL from './_urls';

interface List {
  _id: string;
  userId: string;
  listName: string;
  createdDate: string;
  order: number;
  gameCount: number;
  __v: number;
}

const axiosList = axios.create({
  baseURL: `${API_URL}/apiList`,
});

export const getAllLists = async (userId: string): Promise<List[] | void> => {
  const src = '/getAll';
  const params = { userId };

  return axiosList
    .get(src, { params })
    .then((data) => {
      const allLists = data.data.allLists;

      //? convert object to string: JSON.stringify
      localStorage.setItem('allLists', JSON.stringify(allLists));
      return allLists;
    })
    .catch((error) => {
      if (error.response) {
        // Сервер ответил с кодом, отличным от 2xx
        console.error(error.response.data.message || 'Unknown error');
      } else if (error.request) {
        // Запрос был сделан, но ответ не был получен
        console.error('No connection with server (getAllLists):', error.request);
      } else {
        // Произошло что-то еще
        console.error('Error setting up request (getAllLists):', error.message);
      }
    });
};

export const putRefreshOrders = (lists, removedListLS) => {
  const src = '/refreshOrders';

  axiosList
    .put(src, { lists, removedListLS })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error('Error fetching data (postRefresh):', error);
    });
};

export const putNewList = async (listName) => {
  const src = '/add';
  const userId = localStorage.getItem('userId');

  return axiosList
    .post(src, { userId, listName })
    .then((response) => {
      //TODO user can to change lsits order after crating new lsit,
      //TODO it's will throw an error, couse now I put list in start of array
      //TODO NEED: check new list order by listName

      // change new list in LS on right version from DB
      // const allLists = JSON.parse(localStorage.getItem('allLists'));
      // allLists.shift();
      // allLists.unshift(response.data.list[0]);

      //? convert object to string: JSON.stringify
      // localStorage.setItem('allLists', JSON.stringify(allLists));

      console.log(response.data.message);
      return response.data.list[0];
    })
    .catch((error) => {
      console.error('Error fetching data (postRefresh):', error);
    });
};
