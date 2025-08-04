import { ICreateUser, ILoginUser } from '@/types';
import axiosInstance from '@/utils/restApiConfig';
import { getCsrfToken } from '@/utils/getCSRFToken';

export const registerUser = async (data: ICreateUser) => {
  const response = await axiosInstance.post('/auth/signUp', data, {
     headers: {
       'X-CSRF-Token': getCsrfToken() || ''
    },  
  });
  return response.data;
}
export const loginUser = async (data: ILoginUser) => {
  const response = await axiosInstance.post('/auth/logIn', data);
  return response.data
}

export const checkAuthSSR = async (cookie: string, csrfToken: string) => {
  const response = await axiosInstance.get('/auth/checkSession', {
    headers: {
      Cookie: cookie,
      'X-CSRF-Token':  csrfToken || ''
    },  
  });
  return response.data;
}

export const checkAuthCSR = async () => {
  const response = await axiosInstance.get('/auth/checkSession');
  return response.data;
}

export const checkVerificationSSR = async (cookie: string) => {
  const response = await axiosInstance.get('/auth/checkVerifyToken', {
    headers: {
      Cookie: cookie,
    },
  });
  return response.data;
}

export const logOutUser = async () => {
  console.log(getCsrfToken());
  const response = await axiosInstance.post('/auth/logOut', {},  {
    headers: {
      'X-CSRF-Token': getCsrfToken() || ''
    },
  });
  return response.data;
}

export const verifyPassword = async (password: string) => {
  const response = await axiosInstance.post('/auth/verifyPassword', { newPassword: password });
  return response.data;
}