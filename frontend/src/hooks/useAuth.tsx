import { useState } from 'react';
import { useRouter } from 'next/router';
import { LoginCredentials } from '@/interfaces/login/auth';
import { login } from '@/services/api/complaint';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (credentials: LoginCredentials, redirectTo: string = '/management') => {
    setLoading(true);
    setError('');

    try {
      const response = await login(credentials);
      const token = response.token;
      
      // Set cookie for SSR
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      
      // Redirect to management page
      router.push(redirectTo);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear cookie and redirect
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login';
  };

  const clearError = () => {
    setError('');
  };

  return {
    loading,
    error,
    handleLogin,
    handleLogout,
    clearError
  };
}
