import styles from './Footer.module.css';
import Link from 'next/link';
import { getSettings } from '@/actions/settings';

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <div style={{ marginBottom: '1rem' }}>
            <img src="/logo.svg" alt="Atlas Chrono Cars Logo" style={{ height: '60px', width: 'auto', display: 'block' }} />
          </div>
          <p className={styles.desc}>{settings.companyName} - L&apos;importation automobile de confiance, avec une sélection de véhicules contrôlés et garantis.</p>
          <a 
            href="https://www.facebook.com/atlas.chrono.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginTop: '0.85rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(0, 85, 255, 0.1)',
              color: 'var(--color-accent)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              border: '1px solid rgba(0, 85, 255, 0.2)'
            }}
          >
            📘 Suivre Atlas Chrono Cars sur Facebook &rarr;
          </a>
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
