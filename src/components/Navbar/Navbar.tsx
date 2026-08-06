import Link from 'next/link';
import styles from './Navbar.module.css';
import { getDictionary, getLang } from '@/i18n/getLang';
import LangSwitcher from '../LangSwitcher/LangSwitcher';

export default async function Navbar() {
  const dict = await getDictionary();
  const lang = await getLang();

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Atlas Chrono Cars Logo" style={{ height: '45px', width: 'auto', display: 'block' }} />
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>{dict.navbar.home}</Link>
          <Link href="/cars" className={styles.link}>{dict.navbar.stock}</Link>
          <Link href="/contact" className={styles.link}>{dict.navbar.contact}</Link>
          <LangSwitcher currentLang={lang} />
          <Link href="/admin" className={styles.adminBtn}>{dict.navbar.admin}</Link>
        </div>
      </div>
    </nav>
  );
}
