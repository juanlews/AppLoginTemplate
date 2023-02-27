import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const baseURL = '';

const api = axios.create({
  baseURL,
});
const authURL = 'localhost:3001'
// 120 seconds timeout
api.defaults.timeout = 120000;

api.interceptors.request.use(async function (config) {
  const auth = JSON.parse(await AsyncStorage.getItem('@MYAPPNAME:auth'));
  config.baseURL = `https://${auth.server || authURL}`;

  if (auth.authToken) {
    // set authrozation header for jwt login
    config.headers = {
      authorization: `Bearer ${auth.authToken}`,
    };
  }
  return config;
});

async function get(path) {
  try {
    const response = await api.get(path, {cache: false});
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function post(path, data) {
  try {
    const response = await api.post(path, data);
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      return Promise.reject({
        error,
        message: error.response.data.message,
      });
    }
    return Promise.reject(error);
  }
}

async function patch(path, data) {
  try {
    const response = await api.patch(path, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function del(path) {
  try {
    const response = await api.delete(path);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Requests
async function login(path, data) {
  return {data:{valid: true, user:{username: 'bla', displayName:'blabonito', authToken: 'wqiukjbaihi123'}}};
  try {
      // return await axios.post(`https://${path}/auth/login?requireJWT=true`, data);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  login,
};
