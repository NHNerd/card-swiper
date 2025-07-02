import axios from 'axios';
import { ListDataZus } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

interface List {
  _id: string;
  userId: string;
  createDate: { utcMS: number; utcOffsetMS: number };
  listName: string;
  order: number;
  gameCount: number;
  __v: number;
}

const axiosList = axios.create({
  baseURL: `${API_URL}/apiList`,
});
//? second argumet is optional (ts optional - "?"")
export const getAllLists = async (userId: string, setLS?: boolean): Promise<List[] | void> => {
  const src = '/getAll';
  const params = { userId };

  return axiosList
    .get(src, { params })
    .then((data) => {
      const allLists = data.data.allLists;

      //? convert object to string: JSON.stringify
      if (setLS) localStorage.setItem('card-swiper:allLists', JSON.stringify(allLists));

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

export const putRefreshOrders = (lists: any) => {
  const src = '/refreshOrders';

  axiosList
    .put(src, lists)
    .then((response) => {
      console.log(response.data.message);
      return true;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

export const patchListField = async (_id: any, field: string | number, updateTime: any) => {
  const src = '/patchListField';

  return axiosList
    .patch(src, { _id, field, updateTime })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error('Error patch data:', error);
      return true;
    });
};

export const refreshOrdersSync = async (DTOupdateDB_allOrder: any) => {
  const src = '/refreshOrdersSync';

  return axiosList
    .put(src, DTOupdateDB_allOrder)
    .then((response) => {
      console.log(response.data.message);
      return true;
    })
    .catch((error) => {
      console.error('Error fetching data (postRefresh):', error);
      return false;
    });
};
export const refreshFieldsSync = async (lists: ListDataZus[]) => {
  const src = '/refreshFieldsSync';

  return axiosList
    .put(src, lists)
    .then((response) => {
      console.log(response.data.message);
      return true;
    })
    .catch((error) => {
      console.error('Error fetching data (postRefresh):', error);
      return false;
    });
};
export const patchListSessionCount = async (listNewDTO: { _id: string; sessionCount: number }) => {
  const src = '/patchListSessionCount';

  return axiosList
    .patch(src, listNewDTO)
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error('Error patch data:', error);
      return true;
    });
};

export const putNewList = async (listName: string, createDate: { utcMS: number; utcOffsetMS: number }) => {
  const src = '/add';
  const userId = localStorage.getItem('card-swiper:userId');

  return axiosList
    .post(src, { userId, createDate, listName })
    .then((response) => {
      //TODO user can to change lsits order after crating new lsit,
      //TODO it's will throw an error, couse now I put list in start of array
      //TODO NEED: check new list order by listName

      return response.data.listDTO;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
      console.error('Error fetching data (postRefresh):', error);
    });
};
export const addSync = async (lists: ListDataZus[]) => {
  const src = '/addSync';
  const userId = localStorage.getItem('card-swiper:userId');

  return axiosList
    .post(src, { userId, lists })
    .then((response) => {
      return response.data.addedListsDTO;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
      console.error('Error fetching data (postRefresh):', error);
    });
};

export const remove = async (_id: any, updateOrder: any) => {
  const userId = localStorage.getItem('card-swiper:userId');

  const src = `/delete/${userId}/${_id}/${updateOrder}`;

  return axiosList
    .delete(src)
    .then((response) => {
      console.log(response.data.message);

      const removedLists = JSON.parse(localStorage.getItem('card-swiper:removedLists')) || [];
      const removedListsUpdate = removedLists.filter((item: any) => item._id !== _id);
      if (removedListsUpdate.length === 0) {
        localStorage.removeItem('card-swiper:removedLists');
      } else {
        localStorage.setItem('card-swiper:removedLists', JSON.stringify(removedListsUpdate));
      }

      return true;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        console.log(error.response?.data.message);
        return false;
      }
      console.error('Error fetching data (list remove):', error);
      return false;
    });
};

export const removeMany = async (_id: any[]) => {
  const userId = localStorage.getItem('card-swiper:userId');
  const src = `/deleteMany`;

  return axiosList

    .post(src, { _id, userId })
    .then((response) => {
      console.log(response.data.message);
      return true;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        localStorage.removeItem('card-swiper:removedLists');
        return false;
      }
      console.error('Error fetching data (list remove):', error);
      return false;
    });
};
