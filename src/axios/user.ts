import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;

const axiosUser = axios.create({
  baseURL: `${API_URL}/apiUser`,
});

export const registration = async (email: string, pass: string): Promise<string | void> => {
  const src = `/registration`;

  return axiosUser
    .post(src, { email, pass })
    .then((data) => {
      return data.data.user._id;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.log(error.response?.data.message);
        return statusCode;
      }
    });
};

export const login = (email: string, pass: string): Promise<string | void> => {
  const src = `/login`;

  return axiosUser
    .post(src, { email, pass })
    .then((data) => {
      return data.data._id;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        console.log(error.response.data.message);
        return statusCode;
      }
    });
};

export const getUserId = (email: string): Promise<string | void> => {
  const src = `${API_URL}/apiUser/userData`;
  const params = { email: email };

  return axiosUser
    .get(src, { params })
    .then((data) => {
      localStorage.setItem('card-swiper:userId', data.data._id);
      return data.data._id;
    })
    .catch((error) => {
      console.error('Error fetching data (getUserId):');
      const statusCode = error.response.status;
      if (statusCode === 404) {
        console.log(error.response.data.message);
        return statusCode;
      }
    });
};

export const emailById = (userId: number): Promise<string | void> => {
  const src = `${API_URL}/apiUser/emailById`;
  const params = { _id: userId };
  return axiosUser
    .get(src, { params })
    .then((data) => {
      const email = data.data.email;
      localStorage.setItem('card-swiper:email', email);
      return email;
    })
    .catch((error) => {
      console.error('Error fetching data (email by userId):');
      const statusCode = error.response.status;
      if (statusCode === 404) {
        console.log(error.response.data.message);
        return statusCode;
      }
    });
};
