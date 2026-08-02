"use client";
import { useRouter } from 'next/navigation';

export default function AdminLogoutBtn() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
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
      Se déconnecter
    </button>
  );
}
