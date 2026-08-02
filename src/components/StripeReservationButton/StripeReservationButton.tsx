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
        <span>🔒</span> Paiement Sécurisé par Stripe
      </div>

      <h3 className={styles.title}>Réserver ce véhicule en ligne</h3>
      <p className={styles.description}>
        Bloquez ce véhicule dès aujourd&apos;hui avec un acompte officiel de 50 €. Ce montant est déductible du prix total lors de la finalisation.
      </p>

      <div className={styles.priceTag}>
        <span className={styles.amount}>50,00 €</span>
        <span className={styles.amountLabel}>• Acompte de réservation prioritaire</span>
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
        {loading ? "Redirection vers Stripe Checkout..." : "Payer 50 € et réserver maintenant"}
      </button>

      <div className={styles.securityBar}>
        <div className={styles.secItem}>
          <span>🛡️</span> Garantie de remboursement
        </div>
        <div className={styles.secItem}>
          <span>⚡</span> Activation instantanée
        </div>
        <div className={styles.secItem}>
          <span>🔒</span> SSL 256-bit
        </div>
      </div>
    </div>
  );
}
