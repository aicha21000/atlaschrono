"use server";
import { cookies } from 'next/headers';

export async function loginAdmin(email: string, password: string) {
  const envEmail = process.env.ADMIN_EMAIL || "admin@atlas-chrono.com";
  const envPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (email.toLowerCase() === envEmail.toLowerCase() && password === envPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true };
  }
  
  return { success: false, error: "Identifiants incorrects" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

export async function verifyAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'true';
}
