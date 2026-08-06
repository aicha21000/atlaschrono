"use client";
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/actions/auth';

export default function AdminLogoutBtn({ logoutText = "Se déconnecter" }: { logoutText?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: 'transparent',
        border: '1px solid var(--color-border)',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        marginRight: '1rem',
        transition: 'all 0.2s ease'
      }}
    >
      {logoutText}
    </button>
  );
}
