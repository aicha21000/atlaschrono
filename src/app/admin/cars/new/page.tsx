"use client";
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCar() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'une requête vers Firebase (2 secondes)
    setTimeout(() => {
      setIsSubmitting(false);
      alert("✅ Le véhicule a été publié avec succès ! (Mode Simulation)");
      router.push('/admin');
    }, 1500);
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
                <input type="text" placeholder="ex: Mercedes-Benz" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Modèle</label>
                <input type="text" placeholder="ex: Classe A" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Année Modèle (Max 3 ans)</label>
                <input type="number" placeholder="ex: 2022" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Prix (DZD / EUR)</label>
                <input type="text" placeholder="ex: Sur commande" className={styles.input} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Caractéristiques Techniques</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Kilométrage</label>
                <input type="number" placeholder="ex: 25000" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Énergie</label>
                <select className={styles.select}>
                  <option>Essence</option>
                  <option>Diesel</option>
                  <option>Hybride</option>
                  <option>Électrique</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Boîte de Vitesse</label>
                <select className={styles.select}>
                  <option>Automatique</option>
                  <option>Manuelle</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Couleur</label>
                <input type="text" placeholder="ex: Noir Obsidienne" className={styles.input} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Médias & Description</h2>
            <div className={styles.inputGroup}>
              <label>Description Détaillée</label>
              <textarea rows={5} placeholder="Décrivez les options, l'état du véhicule..." className={styles.textarea}></textarea>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Photos du véhicule</label>
              
              {/* Zone d'upload cliquable */}
              <label className={styles.uploadArea}>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className={styles.hiddenInput} 
                />
                Cliquez pour ajouter des images ou glissez-les ici
              </label>

              {/* Aperçu des images */}
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
  );
}
