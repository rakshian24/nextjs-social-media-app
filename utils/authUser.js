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

const setToken = token => {
  cookie.set('token', token);
  Router.push('/');
};

export const redirectUser = (ctx, location) => {
  //Redirecting if user is making request from server
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  }
  //Redirecting if user is making request from Client
  else {
    Router.push(location);
  }
};

//Setting a email cookie, to show email in the input box after user logs out
export const logoutUser = email => {
  cookie.set('email', email);
  cookie.remove('token');
  Router.push('/login');
  Router.reload();
};
