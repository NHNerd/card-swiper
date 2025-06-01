import axios from 'axios';
import { SessionStatistic } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;

const axiosStatistic = axios.create({
  baseURL: `${API_URL}/apiStatistic`,
});

//? I don't need update Status
//? Couse on Client side sessionDay Obj accamulate statistic
//? After server return success this Obj remove

export const patchSessionDays = async (session: SessionStatistic[]): Promise<string | void> => {
  const src = `/patchSessionDays`;
  const userId = localStorage.getItem('card-swiper:userId');

  if (!userId) return console.error('User ID not found in localStorage');

  return axiosStatistic
    .patch(src, { userId, session })
    .then((data) => {
      console.log(data.data.message);
      if (data.status == 200 || data.status == 201) localStorage.removeItem('card-swiper:sessionAddStatistic');

      return data.data.statistic;
    })
    .catch((error) => {
      if (error.response) {
        // Сервер ответил с кодом, отличным от 2xx
        console.error(error.response?.data.message || 'Unknown error');
        return error.response.status;
      } else if (error.request) {
        // Запрос был сделан, но ответ не был получен
        console.error('No connection with server (getAllLists):', error.request);
      } else {
        // Произошло что-то еще
        console.error('Error setting up request (getAllLists):', error.message);
      }
    });
};

type wordAdd = {
  date: Date;
  wordAdd: number;
};

export const getStatistic = async () => {
  const src = '/getStatistic';
  const userId = localStorage.getItem('card-swiper:userId');

  if (!userId) return console.error('User ID not found in localStorage');

  const params = { userId };

  return axiosStatistic
    .get(src, { params })
    .then((data) => {
      const statistic = data.data.statistic;

      localStorage.setItem('card-swiper:statistics', JSON.stringify(statistic));

      return statistic;
    })
    .catch((error) => {
      if (error.response) {
        // Сервер ответил с кодом, отличным от 2xx
        console.error(error.response?.data.message || 'Unknown error');
        return error.response.status;
      } else if (error.request) {
        // Запрос был сделан, но ответ не был получен
        console.error('No connection with server (getAllLists):', error.request);
      } else {
        // Произошло что-то еще
        console.error('Error setting up request (getAllLists):', error.message);
      }
    });
};
