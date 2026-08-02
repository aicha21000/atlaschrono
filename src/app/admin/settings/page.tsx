"use client";

import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSettings, updateSettings, Settings } from '@/actions/settings';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      await updateSettings(formData);
      alert("✅ Les paramètres du showroom ont été mis à jour avec succès !");
      router.push('/admin');
    } catch (error) {
      alert("Erreur lors de la sauvegarde des paramètres.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!settings) {
    return (
      <AdminAuthGuard>
        <div className={styles.container}>
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            Chargement des paramètres...
          </div>
        </div>
      </AdminAuthGuard>
    );
  }

  return (
    <AdminAuthGuard>
      <div className={styles.container}>
        <div className="container">
          <header className={styles.header}>
            <Link href="/admin" className={styles.backLink}>← Retour au tableau de bord</Link>
            <h1 className={styles.title}>Paramètres du Showroom</h1>
            <p className={styles.subtitle}>Personnalisez vos coordonnées, vos horaires et votre pied de page (Footer).</p>
          </header>

          <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <h2>Coordonnées & Contact</h2>
              
              <div className={styles.inputGroup}>
                <label htmlFor="companyName">Nom du showroom</label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  defaultValue={settings.companyName} 
                  required 
                  className={styles.input} 
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Numéro de Téléphone</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone" 
                  defaultValue={settings.phone} 
                  required 
                  className={styles.input} 
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Adresse Email officielle</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  defaultValue={settings.email} 
                  required 
                  className={styles.input} 
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="address">Adresse physique complète</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  defaultValue={settings.address} 
                  required 
                  className={styles.input} 
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="openingHours">Heures d'ouverture</label>
                <input 
                  type="text" 
                  id="openingHours" 
                  name="openingHours" 
                  defaultValue={settings.openingHours} 
                  required 
                  className={styles.input} 
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Pied de page (Footer)</h2>
              
              <div className={styles.inputGroup}>
                <label htmlFor="footerText">Texte de bas de page / Copyright</label>
                <textarea 
                  id="footerText" 
                  name="footerText" 
                  rows={4} 
                  defaultValue={settings.footerText} 
                  required 
                  className={styles.textarea} 
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/admin" className={styles.cancelBtn}>Annuler</Link>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement en cours..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
