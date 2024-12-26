import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/utils/api/auth';
import { toast } from '@/utils/toast';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.register({ email, password });
      toast.success(response.message);
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const requestMagicLink = async (email: string) => {
    setLoading(true);
    try {
      const response = await authService.requestMagicLink({ email });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyMagicLink = async (token: string) => {
    setLoading(true);
    try {
      const response = await authService.verifyMagicLink(token);
      // Store token in localStorage or secure cookie
      localStorage.setItem('token', response.token || '');
      toast.success(response.message);
      router.push('/books');
    } catch (error: any) {
      toast.error(error.message);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return { register, requestMagicLink, verifyMagicLink, loading };
};
