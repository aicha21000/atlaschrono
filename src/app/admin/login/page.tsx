import styles from './page.module.css';

export default function AdminLogin() {
  return (
    <div className={styles.loginContainer}>
      <div className={`glass-panel ${styles.loginCard}`}>
        <h1 className={styles.title}>Espace Administrateur</h1>
        <p className={styles.subtitle}>Connectez-vous pour gérer le catalogue.</p>
        
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Adresse Email</label>
            <input type="email" id="email" placeholder="admin@premiumautodz.com" required className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="••••••••" required className={styles.input} />
          </div>
          <button type="submit" className={styles.submitBtn}>Se connecter</button>
        </form>
      </div>
    </div>
  );
}
