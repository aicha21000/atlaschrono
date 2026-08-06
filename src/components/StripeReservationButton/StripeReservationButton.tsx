"use client";

import React, { useState } from 'react';
import styles from './StripeReservationButton.module.css';
import { createReservationSession } from '@/actions/stripe';
import { useRouter } from 'next/navigation';

interface StripeReservationButtonProps {
  carId: string;
  carTitle: string;
  carPrice: string;
  carStatus?: string;
  dict: any;
}

export default function StripeReservationButton({ carId, carTitle, carPrice, carStatus, dict }: StripeReservationButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (carStatus === "Réservé" || carStatus === "Vendu") {
    return null;
  }

  const handleReserve = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await createReservationSession(carId, carTitle, carPrice);
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        setErrorMessage(res.error || "Impossible d'initialiser la réservation.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Une erreur réseau est survenue.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <span>⏳</span> {dict.reservation.term1}
      </div>

      <h3 className={styles.title}>{dict.reservation.btnTitle}</h3>
      <p className={styles.description}>
        {dict.reservation.depositAmount} 100 €
      </p>

      <div className={styles.priceTag}>
        <span className={styles.amount}>100,00 €</span>
        <span className={styles.amountLabel}>• {dict.reservation.term1}</span>
      </div>

      <div style={{
        padding: '0.95rem 1.1rem',
        background: 'rgba(56, 189, 248, 0.14)',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        borderRadius: '12px',
        marginBottom: '1.25rem',
        color: '#e0f2fe',
        fontSize: '0.86rem',
        lineHeight: '1.5'
      }}>
        <strong style={{ display: 'block', color: '#38bdf8', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
          ⏳ {dict.reservation.termsTitle}
        </strong>
        {dict.reservation.term2} {dict.reservation.term3}
      </div>

      {errorMessage && (
        <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>
          ⚠️ {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleReserve}
        disabled={loading}
        className={styles.reserveBtn}
      >
        <span>💳</span>
        {loading ? "..." : dict.reservation.btnAction}
      </button>

      <div className={styles.securityBar}>
        <div className={styles.secItem}>
          <span>⏳</span> Exclusivité 8 jours
        </div>
        <div className={styles.secItem}>
          <span>🛡️</span> {dict.reservation.btnSecure} Stripe
        </div>
      </div>
    </div>
  );
}
