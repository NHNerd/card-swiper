import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosWord = axios.create({
  baseURL: `${API_URL}/apiWord`,
});

export const getAllWords = async (userId) => {
  const src = '/getAll';

  const params = { userId };

  return axiosWord
    .get(src, { params })
    .then((data) => {
      const Allwords = data.data.allWords;
      console.log(Allwords);
      //? convert object to string: JSON.stringify
      localStorage.setItem('card-swiper:allWords', JSON.stringify(Allwords));
      return Allwords;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || 'Unknown errorMessage';
      const statusCode = error.response?.status || 'Unknown statusCode';
      if (statusCode === 404) {
        console.log(errorMessage, error);
        //! WHat I need return?????????
        return false;
      }
    });
};

export const putNewWord = async (listId, word: string, translate: string) => {
  const src = '/add';
  const userId = localStorage.getItem('card-swiper:userId');

  return axiosWord
    .post(src, { userId, listId, word, translate })
    .then((response) => {
      console.log(response.data.message);
      return response.data.newWord;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
    });
};

export const patchWordField = async (
  _id: any,
  word: string,
  translate: string,
  updateWord: any,
  updateTranslate: any
) => {
  const src = '/patchWordField';

  const userId = localStorage.getItem('card-swiper:userId');

  return axiosWord
    .patch(src, {
      userId,
      _id,
      word,
      translate,
      updateWord,
      updateTranslate,
    })
    .then((response) => {
      console.log(response.data.message);
      return true;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
      if (statusCode === 404) {
        console.log(error.response?.data.message);
        return statusCode;
      }
    });
};

interface Word {
  word: string;
  translate: string;
}

export const putNewBulkWord = async (listId: number, words: Word[]): Promise<any> => {
  const src = '/addBulk';
  const userId = localStorage.getItem('card-swiper:userId');

  return axiosWord
    .post(src, { userId, listId, words })
    .then((response) => {
      console.log(response.data.message);
      return response.data.newWords;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
    });
};
