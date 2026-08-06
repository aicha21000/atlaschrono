"use server";

import { cookies } from 'next/headers';

export async function setLanguage(lang: 'fr' | 'ar') {
  const cookieStore = await cookies();
  cookieStore.set('lang', lang, { path: '/', maxAge: 31536000 });
}
