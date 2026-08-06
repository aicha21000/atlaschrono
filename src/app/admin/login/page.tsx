"use client";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyAdmin, loginAdmin } from '@/actions/auth';

export default function AdminLogin() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    verifyAdmin().then(isLoggedIn => {
      if (isLoggedIn) {
        router.replace('/admin');
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    
    const res = await loginAdmin(password);
    if (res.success) {
      router.push('/admin');
    } else {
      setErrorMsg(res.error || "Erreur de connexion");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`glass-panel ${styles.loginCard}`}>
        <h1 className={styles.title}>Espace Administrateur</h1>
        <p className={styles.subtitle}>Connectez-vous pour gérer le catalogue.</p>
        
        <form className={styles.form} onSubmit={handleLogin}>
          {errorMsg && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{errorMsg}</div>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" defaultValue="admin@atlas-chrono.com" disabled className={styles.input} style={{ opacity: 0.6 }} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="••••••••" required className={styles.input} />
          </div>
          <button type="submit" className={styles.submitBtn}>Se connecter</button>
        </form>
      </div>
    </div>
  );
}
