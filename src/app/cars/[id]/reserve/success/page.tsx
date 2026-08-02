import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';
import { confirmReservation } from '@/actions/stripe';
import { notFound } from 'next/navigation';

export default async function ReservationSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string; demo?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const cars = await getCars();
  const car = cars.find((c: any) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  // 1. Validation de la réservation : On bascule le statut du véhicule à "Réservé"
  await confirmReservation(resolvedParams.id);

  const sessionId = resolvedSearchParams.session_id || (resolvedSearchParams.demo ? "DEMO-STRIPE-CHECKOUT-50EUR" : "STRIPE-OK");

  return (
    <div className={styles.successContainer}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          ✓
        </div>

        <h1 className={styles.title}>Félicitations, réservation confirmée !</h1>
        <p className={styles.subtitle}>
          Votre acompte sécurisé de <strong>50,00 €</strong> a été validé. Le véhicule est officiellement bloqué.
        </p>

        {/* REÇU OFFICIEL DE RÉSERVATION STRIPE */}
        <div className={styles.receiptBox}>
          <div className={styles.receiptRow}>
            <span className={styles.label}>Véhicule réservé</span>
            <span className={styles.value}>{car.marque} {car.modele} ({car.annee})</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.label}>Acompte Stripe versé</span>
            <span className={styles.value} style={{ color: '#166534' }}>50,00 € (Payé)</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.label}>Statut showroom</span>
            <span className={styles.statusReserved}>🟡 RÉSERVÉ (EXCLUSIF)</span>
          </div>
          <div className={styles.receiptRow}>
            <span className={styles.label}>Réf. Transaction</span>
            <span className={styles.value} style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
              {sessionId.substring(0, 24)}...
            </span>
          </div>
        </div>

        {/* PROCHAINES ÉTAPES DU SHOWROOM */}
        <div className={styles.nextSteps}>
          <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
            📌 Prochaines étapes avec notre équipe :
          </strong>
          Un conseiller commercial vous contactera par téléphone sous 24h ouvrées pour vous transmettre le contrat officiel et organiser le règlement du solde ({car.prix}) ou planifier une visite au showroom.
        </div>

        {/* BOUTONS DE RETOUR */}
        <div className={styles.actions}>
          <Link href={`/cars/${car.id}`} className={styles.btnPrimary}>
            Voir la fiche du véhicule &rarr;
          </Link>
          <Link href="/cars" className={styles.btnSecondary}>
            Retour au catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
