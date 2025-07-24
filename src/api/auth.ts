import { ICreateUser, ILoginUser } from '@/types';
import axiosInstance from '@/utils/restApiConfig';

export const registerUser = async (data: ICreateUser) => {
  const response = await axiosInstance.post('/auth/signUp', data);
  return response.data;
}
export const loginUser = async (data: ILoginUser) => {
  const response = await axiosInstance.post('/auth/logIn', data);
  return response.data
}

export const checkAuthSSR = async (cookie: string) => {
  const response = await axiosInstance.get('/auth/checkSession', {
    headers: {
      Cookie: cookie,
    },
  });
  return response.data;
}

export const checkAuthCSR = async () => {
  const response = await axiosInstance.get('/auth/checkSession');
  return response.data;
}

export const logOutUser = async () => {
  const response = await axiosInstance.post('/auth/logOut');
  return response.data;
}

export const changePassword = async (password: string) => {
  const response = await axiosInstance.post('/auth/changePassword', { password });
  return response.data;
}