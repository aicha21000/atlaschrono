"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface Settings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  footerText: string;
}

const defaultSettings: Settings = {
  companyName: "Atlas Chrono Cars",
  address: "Alger Centre, Algérie / France (Importation directe)",
  phone: "+213 555 12 34 56",
  email: "rachi69003@gmail.com",
  openingHours: "Samedi - Jeudi : 09h00 - 19h00",
  footerText: "© 2026 Atlas Chrono Cars. Votre partenaire de confiance pour l'importation de véhicules."
};

export async function getSettings(): Promise<Settings> {
  try {
    const docRef = doc(db, 'settings', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...defaultSettings, ...(docSnap.data() as Settings) };
    }
  } catch (error) {
    console.error("Firebase fetch error (settings):", error);
  }
  return defaultSettings;
}

export async function updateSettings(formData: FormData) {
  const newSettings: Settings = {
    companyName: (formData.get('companyName') as string) || defaultSettings.companyName,
    address: (formData.get('address') as string) || defaultSettings.address,
    phone: (formData.get('phone') as string) || defaultSettings.phone,
    email: (formData.get('email') as string) || defaultSettings.email,
    openingHours: (formData.get('openingHours') as string) || defaultSettings.openingHours,
    footerText: (formData.get('footerText') as string) || defaultSettings.footerText,
  };

  try {
    const docRef = doc(db, 'settings', 'main');
    await setDoc(docRef, newSettings);
  } catch (error) {
    console.error("Firebase update error (settings):", error);
    return { success: false, error: "Impossible de sauvegarder les paramètres." };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/contact');
  revalidatePath('/admin');
  revalidatePath('/admin/settings');

  return { success: true };
}
