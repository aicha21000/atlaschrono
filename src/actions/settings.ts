"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const settingsPath = path.join(process.cwd(), 'settings.json');

export interface Settings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  footerText: string;
}

const defaultSettings: Settings = {
  companyName: "Premium Auto DZ",
  address: "123 Boulevard Colonel Amirouche, Alger Centre, Algérie",
  phone: "+213 555 12 34 56",
  email: "contact@premiumautodz.com",
  openingHours: "Samedi - Jeudi : 09h00 - 18h00",
  footerText: "© 2026 Premium Auto DZ. Votre partenaire de confiance pour l'importation de véhicules de prestige en Algérie."
};

export async function getSettings(): Promise<Settings> {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (error) {
    // Fallback to default
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

  fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));

  revalidatePath('/', 'layout');
  revalidatePath('/contact');
  revalidatePath('/admin');
  revalidatePath('/admin/settings');

  return { success: true };
}
