import { api, persistToken, clearToken } from './client';
import type { User } from '../types';

export type AuthResponse = {
  token: string;
  user: User;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResponse>('/api/user/login', { email, password });
  persistToken(data.token);
  return data;
};

export const register = async (userName: string, email: string, password: string) => {
  await api.post('/api/user/register', { userName, email, password });
  // backend register does not return token; immediately log in to get token + user
  return login(email, password);
};

export const logout = () => {
  clearToken();
};
