import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';

export const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export const registerUser = async (
  user,
  profilePicUrl,
  setError,
  setFormLoading,
) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
      profilePicUrl,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setFormLoading(false);
};

export const loginUser = async (user, setError, setFormLoading) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setFormLoading(false);
};

const setToken = (token) => {
  cookie.set('token', token);
  Router.push('/');
};
