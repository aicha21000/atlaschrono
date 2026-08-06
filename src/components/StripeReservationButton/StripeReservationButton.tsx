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
}

export default function StripeReservationButton({ carId, carTitle, carPrice, carStatus }: StripeReservationButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Nous permettons la réservation uniquement si le véhicule est Disponible ou En arrivage
  if (carStatus === "Réservé" || carStatus === "Vendu") {
    return null;
  }

  const handleReserve = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await createReservationSession(carId, carTitle, carPrice);
      if (res.success && res.url) {
        // Redirection vers Stripe Checkout (ou mode Sandbox/Démo si pas de clé configurée)
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
        <span>⏳</span> Réservation exclusive de 8 jours
      </div>

      <h3 className={styles.title}>Réserver ce véhicule en ligne</h3>
      <p className={styles.description}>
        Bloquez ce véhicule exclusivement à votre nom avec un acompte officiel de 100 €.
      </p>

      <div className={styles.priceTag}>
        <span className={styles.amount}>100,00 €</span>
        <span className={styles.amountLabel}>• Acompte garanti pendant 8 jours</span>
      </div>

      {/* ENCADRÉ EXPLICITE DU MESSAGE DE RÉSERVATION DE 8 JOURS */}
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
          ⏳ Conditions de réservation Atlas Chrono Cars :
        </strong>
        En réglant cet acompte de <strong>100 €</strong> via Stripe, ce véhicule vous est <strong>exclusivement réservé pendant 8 jours</strong> et est immédiatement retiré de la vente. Ce montant sera intégralement déduit du prix total lors de l&apos;acquisition.
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
        {loading ? "Redirection vers Stripe Checkout..." : "Payer 100 € et réserver pour 8 jours"}
      </button>

      <div className={styles.securityBar}>
        <div className={styles.secItem}>
          <span>⏳</span> Exclusivité 8 jours
        </div>
        <div className={styles.secItem}>
          <span>🛡️</span> Acompte déductible
        </div>
        <div className={styles.secItem}>
          <span>🔒</span> SSL 256-bit
        </div>
      </div>
    </div>
  );
}
