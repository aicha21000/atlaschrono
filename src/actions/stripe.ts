"use server";

import Stripe from 'stripe';
import { updateCarStatus } from './cars';
import { headers } from 'next/headers';

export async function createReservationSession(carId: string, carTitle: string, carPrice: string) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // 1. Si une clé secrète Stripe est configurée, on crée une vraie session de paiement Stripe Checkout (100 EUR / 8 jours)
  if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
    try {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-01-27.acacia' as any,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Réservation 8 Jours : ${carTitle}`,
                description: `Acompte de 100,00 € pour la réservation exclusive de 8 jours du véhicule ${carTitle} (Prix : ${carPrice}). Montant déductible lors de l'achat.`,
              },
              unit_amount: 10000, // 100.00 EUR en centimes
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/cars/${carId}/reserve/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cars/${carId}?error=cancelled`,
        metadata: {
          carId: carId,
          carTitle: carTitle,
          reservationAmount: '100 EUR',
          duration: '8 jours',
        },
      });

      if (session.url) {
        return { success: true, url: session.url };
      }
    } catch (error: any) {
      console.error("Erreur Stripe:", error.message);
      return { success: false, error: error.message || "Erreur lors de l'initialisation de Stripe." };
    }
  }

  // 2. Mode Démo / Sandbox (Si aucune clé Stripe STRIPE_SECRET_KEY n'est encore dans le fichier .env.local)
  // Nous redirigeons vers la page de succès qui simule le passage en statut "Réservé" pour tester l'expérience en ligne.
  return { 
    success: true, 
    url: `${baseUrl}/cars/${carId}/reserve/success?demo=true&carId=${carId}`,
    isDemo: true 
  };
}

export async function confirmReservation(carId: string) {
  try {
    await updateCarStatus(carId, "Réservé");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
