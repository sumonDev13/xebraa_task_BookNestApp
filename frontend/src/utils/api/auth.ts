import axios from 'axios';
import { RegisterData, LoginData, AuthResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Registration failed');
    }
  },

  async requestMagicLink(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Magic link request failed');
    }
  },

  async verifyMagicLink(token: string): Promise<AuthResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/verify/${token}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Verification failed');
    }
  }
};
