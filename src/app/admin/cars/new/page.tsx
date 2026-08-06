"use client";
import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { dictionaries } from '@/i18n/dictionaries';
import { useRouter } from 'next/navigation';
import { addCar } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';

export default function NewCar() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    if (document.documentElement.lang === 'ar') {
      setLang('ar');
    }
  }, []);

  const dict = dictionaries[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    // On ajoute explicitement les fichiers si nécessaire, mais le <form> le fera seul si l'input a un name="images".

    try {
      await addCar(formData);
      alert("✅ Le véhicule a été publié avec succès !");
      router.push('/admin');
    } catch (error) {
      alert("Erreur lors de la publication.");
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminAuthGuard>
    <div className={styles.newCarContainer}>
      <div className="container">
        <header className={styles.header}>
          <Link href="/admin" className={styles.backBtn}>&larr; Retour au tableau de bord</Link>
          <h1 className={styles.title}>Ajouter un nouveau véhicule</h1>
        </header>

        <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h2>Informations Générales</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Marque</label>
                <input type="text" name="marque" placeholder="ex: Mercedes-Benz" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Modèle</label>
                <input type="text" name="modele" placeholder="ex: Classe A" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Année Modèle (Max 3 ans)</label>
                <input type="number" name="annee" placeholder="ex: 2022" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.adminForm?.priceLabel || "Prix affiché"}</label>
                <input type="text" name="prix" placeholder="ex: 18 500 000" className={styles.input} required />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>{dict.adminForm?.presentationLabel || "Caractéristiques Techniques"}</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Kilométrage</label>
                <input type="number" name="kilometrage" placeholder="ex: 25000" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.adminForm?.energyLabel || "Énergie"}</label>
                <select name="energie" className={styles.select}>
                  <option value="Essence">{dict.adminForm?.energyGasoline || "Essence"}</option>
                  <option value="Diesel">{dict.adminForm?.energyDiesel || "Diesel"}</option>
                  <option value="Hybride">{dict.adminForm?.energyHybrid || "Hybride"}</option>
                  <option value="Électrique">{dict.adminForm?.energyElectric || "Électrique"}</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.adminForm?.gearboxLabel || "Boîte de Vitesse"}</label>
                <select name="boite" className={styles.select}>
                  <option value="Automatique">{dict.adminForm?.gearboxAuto || "Automatique"}</option>
                  <option value="Manuelle">{dict.adminForm?.gearboxManual || "Manuelle"}</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.adminForm?.colorLabel || "Couleur"}</label>
                <input type="text" name="couleur" placeholder="ex: Noir Obsidienne" className={styles.input} required />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Médias & Description</h2>
            <div className={styles.inputGroup}>
              <label>{dict.adminForm?.descLabel || "Description Détaillée"}</label>
              <textarea name="description" rows={5} placeholder="Décrivez les options, l'état du véhicule..." className={styles.textarea}></textarea>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Photos du véhicule</label>
              
              <label className={styles.uploadArea}>
                <input 
                  type="file" 
                  name="images"
                  multiple 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className={styles.hiddenInput} 
                />
                Cliquez pour ajouter des images ou glissez-les ici
              </label>

              {images.length > 0 && (
                <div className={styles.imagePreviewContainer}>
                  {images.map((img, idx) => (
                    <div key={idx} className={styles.imagePreview}>
                      <img src={img} alt={`Preview ${idx}`} />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className={styles.removeImgBtn}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>

            <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
              <label htmlFor="controleTechnique" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <span>🛡️</span> Certificat de Contrôle Technique (Optionnel - Image ou PDF)
              </label>
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
                Fichier JPG, PNG ou PDF officiel de contrôle technique qui s&apos;affichera sur le côté de l&apos;annonce.
              </small>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/admin" className={styles.cancelBtn}>Annuler</Link>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
