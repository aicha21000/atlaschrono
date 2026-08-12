'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';
import Link from 'next/link';

interface CookieBannerProps {
  dict: any;
}

export default function CookieBanner({ dict }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={`container ${styles.content}`}>
        <p>
          {dict.cookieBanner?.text || "En poursuivant votre navigation, vous acceptez l'utilisation de cookies et le traitement de votre adresse IP pour des statistiques de fréquentation et de sécurité."}
          {' '}
          <Link href="/privacy" className={styles.link}>
            {dict.cookieBanner?.policyLink || "Politique de confidentialité"}
          </Link>
        </p>
        <div className={styles.actions}>
          <button onClick={handleDecline} className={styles.btnDecline}>
            {dict.cookieBanner?.decline || "Refuser"}
          </button>
          <button onClick={handleAccept} className={styles.btnAccept}>
            {dict.cookieBanner?.accept || "Accepter"}
          </button>
        </div>
      </div>
    </div>
  );
}
