import { ICreateUser } from '@/types';
import axiosInstance from '@/utils/restApiConfig';

export async function registerUser(data: ICreateUser) {
  const response = await axiosInstance.post('/auth/signUp', data);
  return response.data;
}