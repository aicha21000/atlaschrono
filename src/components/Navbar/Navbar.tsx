import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Atlas Chrono Cars Logo" style={{ height: '45px', width: 'auto', display: 'block' }} />
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
