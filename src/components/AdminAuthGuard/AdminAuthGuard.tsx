"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdmin } from '@/actions/auth';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    verifyAdmin().then(isLoggedIn => {
      if (!isLoggedIn) {
        router.replace('/admin/login');
      } else {
        setAuthorized(true);
      }
    });
  }, [router]);

  if (!authorized) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
        Vérification de l'authentification administrateur...
      </div>
    );
  }

  return <>{children}</>;
}
