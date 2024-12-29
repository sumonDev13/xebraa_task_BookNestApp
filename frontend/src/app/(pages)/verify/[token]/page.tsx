'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyPage({ params }: { params: Promise<{ token: string }> }) {
  const { verifyMagicLink } = useAuth();

useEffect(() => {
  params.then((params) => {
    if (params.token) {
      verifyMagicLink(params.token);
    }
  });
}, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Verifying Magic Link...</h2>
        <p>Please wait while we authenticate you.</p>
      </div>
    </div>
  );
}
