"use client";

import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getCars, updateCar } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';

export default function EditCar({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCars().then(cars => {
      const found = cars.find((c: any) => c.id === resolvedParams.id);
      if (found) setCar(found);
    });
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      await updateCar(resolvedParams.id, formData);
      alert("✅ Les informations du véhicule ont été mises à jour !");
      router.push('/admin');
    } catch (error) {
      alert("Erreur lors de la modification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return (
      <AdminAuthGuard>
        <div className={styles.container}>
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            Chargement de l&apos;annonce...
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
            <h1 className={styles.title}>Modifier : {car.marque} {car.modele}</h1>
            <p className={styles.subtitle}>Mettez à jour le prix, le kilométrage, la description ou le statut.</p>
          </header>

          <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <h2>Informations du véhicule</h2>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="marque">Marque</label>
                  <input type="text" id="marque" name="marque" defaultValue={car.marque} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="modele">Modèle</label>
                  <input type="text" id="modele" name="modele" defaultValue={car.modele} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="annee">Année</label>
                  <input type="number" id="annee" name="annee" defaultValue={car.annee} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="kilometrage">Kilométrage</label>
                  <input type="number" id="kilometrage" name="kilometrage" defaultValue={car.kilometrage} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="prix">Prix affiché (ex: 18 500 000 DZD)</label>
                  <input type="text" id="prix" name="prix" defaultValue={car.prix} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="status">Statut dans le showroom</label>
                  <select id="status" name="status" defaultValue={car.status || "Disponible"} className={styles.select}>
                    <option value="Disponible">🟢 Disponible</option>
                    <option value="En arrivage">⏳ En arrivage</option>
                    <option value="Réservé">🟡 Réservé</option>
                    <option value="Vendu">🔴 Vendu</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="energie">Énergie</label>
                  <select id="energie" name="energie" defaultValue={car.energie} className={styles.select}>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="boite">Boîte de vitesses</label>
                  <select id="boite" name="boite" defaultValue={car.boite} className={styles.select}>
                    <option value="Automatique">Automatique</option>
                    <option value="Manuelle">Manuelle</option>
                  </select>
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="couleur">Couleur extérieure & intérieure</label>
                  <input type="text" id="couleur" name="couleur" defaultValue={car.couleur} required className={styles.input} />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Description & Détails</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="description">Présentation complète</label>
                <textarea id="description" name="description" rows={5} defaultValue={car.description} required className={styles.textarea} />
              </div>

              <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                <label htmlFor="controleTechnique" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <span>🛡️</span> Certificat de Contrôle Technique / Rapport d&apos;inspection (Image ou PDF)
                </label>
                {car.controleTechnique && (
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                    ✓ Document actuel : <a href={car.controleTechnique} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--color-accent)' }}>Consulter le rapport existant</a>
                  </div>
                )}
                <input 
                  type="file" 
                  id="controleTechnique" 
                  name="controleTechnique" 
                  accept="image/*,.pdf" 
                  style={{
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    background: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    width: '100%'
                  }}
                />
                <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.4rem' }}>
                  Laissez vide pour conserver le document actuel, ou sélectionnez un nouveau fichier pour le modifier.
                </small>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/admin" className={styles.cancelBtn}>Annuler</Link>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Mise à jour en cours..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
