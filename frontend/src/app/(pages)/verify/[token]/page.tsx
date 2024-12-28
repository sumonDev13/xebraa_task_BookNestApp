'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyPage({ 
  params 
}: { 
  params: { token: string } 
}) {
  const { verifyMagicLink } = useAuth();

  useEffect(() => {
    if (params.token) {
      verifyMagicLink(params.token);
    }
  }, [params.token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Verifying Magic Link...</h2>
        <p>Please wait while we authenticate you.</p>
      </div>
    </div>
  );
}
