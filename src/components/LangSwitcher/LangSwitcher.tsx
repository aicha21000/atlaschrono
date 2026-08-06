"use client";

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setLanguage } from '@/actions/lang';
import { Lang } from '@/i18n/dictionaries';
import styles from './LangSwitcher.module.css';

export default function LangSwitcher({ currentLang }: { currentLang: Lang }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (lang: Lang) => {
    setIsOpen(false);
    if (lang === currentLang) return;
    
    startTransition(async () => {
      await setLanguage(lang);
      // Actualise la page courante pour prendre en compte le nouveau cookie
      router.refresh();
    });
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.toggleBtn} 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        <span>🌐</span>
        <span className={styles.current}>{currentLang.toUpperCase()}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button 
            className={`${styles.option} ${currentLang === 'fr' ? styles.active : ''}`}
            onClick={() => switchLanguage('fr')}
          >
            🇫🇷 Français
          </button>
          <button 
            className={`${styles.option} ${currentLang === 'ar' ? styles.active : ''}`}
            onClick={() => switchLanguage('ar')}
          >
            🇩🇿 العربية
          </button>
        </div>
      )}
    </div>
  );
}
