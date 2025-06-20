import axiosInstance from '@/utils/restApiConfig';

export async function registerUser(data: { email: string; password: string; role: string }) {
  const response = await axiosInstance.post('/register', data);
  return response.data;
}