"use client";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'une connexion réussie pour le prototype
    router.push('/admin');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`glass-panel ${styles.loginCard}`}>
        <h1 className={styles.title}>Espace Administrateur</h1>
        <p className={styles.subtitle}>Connectez-vous pour gérer le catalogue.</p>
        
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" placeholder="admin@premiumautodz.com" defaultValue="admin@premiumautodz.com" required className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="••••••••" defaultValue="admin123" required className={styles.input} />
          </div>
          <button type="submit" className={styles.submitBtn}>Se connecter</button>
        </form>
      </div>
    </div>
  );
}
