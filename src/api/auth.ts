import { ICreateUser, ILoginUser } from '@/types';
import axiosInstance from '@/utils/restApiConfig';

export async function registerUser(data: ICreateUser) {
  const response = await axiosInstance.post('/auth/signUp', data);
  return response.data;
}
export const loginUser = async (data: ILoginUser) => {
  const response = await axiosInstance.post('/auth/logIn', data);
  return response.data
}