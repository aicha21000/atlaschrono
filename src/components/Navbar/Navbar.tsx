import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={`${styles.logo} chrome-text`}>
          Premium<span className={styles.accent}>Auto</span> DZ
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Accueil</Link>
          <Link href="/cars" className={styles.link}>Catalogue</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          <Link href="/admin" className={styles.adminBtn}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}
