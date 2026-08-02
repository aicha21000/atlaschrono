import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>Premium<span className={styles.accent}>Auto</span> DZ</h3>
          <p className={styles.desc}>Votre partenaire de confiance pour l'importation de véhicules récents en Algérie.</p>
        </div>
        <div className={styles.links}>
          <h4>Liens Rapides</h4>
          <ul>
            <li><Link href="/cars">Véhicules en stock</Link></li>
            <li><Link href="/contact">Nous contacter</Link></li>
            <li><Link href="/admin/login">Espace Admin</Link></li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>📍 Alger, Algérie (Adresse complète à définir)</p>
          <p>📞 +213 XX XX XX XX</p>
          <p>✉️ contact@premiumautodz.com</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Premium Auto DZ. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
