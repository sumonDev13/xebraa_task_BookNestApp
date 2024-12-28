'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/utils/toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Magic link sent successfully to your email');
        setAuth(data.data.email, data.data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Magic Link Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <Button type="submit" className="w-full mt-4" disabled={loading} onClick={handleSubmit} >
      {loading ? 'Sending Magic Link...' : 'Send'}
      </Button>
      <p> If you don't have an account, please  <a className='text-blue-500' href="/register">register</a> here</p>
    </form>
      </div>
    </div>
  );
}
