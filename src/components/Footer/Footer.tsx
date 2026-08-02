import styles from './Footer.module.css';
import Link from 'next/link';
import { getSettings } from '@/actions/settings';

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>Premium<span className={styles.accent}>Auto</span> DZ</h3>
          <p className={styles.desc}>{settings.companyName} - Votre partenaire de confiance pour l'importation de véhicules récents en Algérie.</p>
        </div>
        <div className={styles.links}>
          <h4>Liens Rapides</h4>
          <ul>
            <li><Link href="/cars">Véhicules en stock</Link></li>
            <li><Link href="/contact">Nous contacter</Link></li>
            <li><Link href="/admin">Espace Admin</Link></li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>📍 {settings.address}</p>
          <p>📞 {settings.phone}</p>
          <p>✉️ {settings.email}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>{settings.footerText}</p>
        </div>
      </div>
    </footer>
  );
}
