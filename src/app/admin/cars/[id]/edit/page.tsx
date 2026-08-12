"use client";

import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { dictionaries } from '@/i18n/dictionaries';
import { useRouter } from 'next/navigation';
import { getCars, updateCar } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditCar({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    if (document.documentElement.lang === 'ar') {
      setLang('ar');
    }
  }, []);

  const dict = dictionaries[lang];

  useEffect(() => {
    getCars().then(cars => {
      const found = cars.find((c: any) => c.id === resolvedParams.id);
      if (found) {
        setCar(found);
        setExistingImages(found.images || []);
      }
    });
  }, [resolvedParams.id]);

  const handleDeleteImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const newImages = [...existingImages];
    const temp = newImages[index - 1];
    newImages[index - 1] = newImages[index];
    newImages[index] = temp;
    setExistingImages(newImages);
  };

  const handleMoveRight = (index: number) => {
    if (index === existingImages.length - 1) return;
    const newImages = [...existingImages];
    const temp = newImages[index + 1];
    newImages[index + 1] = newImages[index];
    newImages[index] = temp;
    setExistingImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const carId = resolvedParams.id;

      // Get files directly from inputs since we don't have state for them here
      const imagesInput = document.getElementById('images') as HTMLInputElement;
      if (imagesInput && imagesInput.files) {
        for (let i = 0; i < imagesInput.files.length; i++) {
          const file = imagesInput.files[i];
          if (file && file.size > 0) {
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const uniqueName = `cars/${carId}/${Date.now()}-${safeName}`;
            const storageRef = ref(storage, uniqueName);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            formData.append('imageUrls', url);
          }
        }
      }

      const ctInput = document.getElementById('controleTechnique') as HTMLInputElement;
      if (ctInput && ctInput.files && ctInput.files.length > 0) {
        const ctFile = ctInput.files[0];
        const safeName = ctFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `cars/${carId}/CT-${Date.now()}-${safeName}`;
        const storageRef = ref(storage, uniqueName);
        await uploadBytes(storageRef, ctFile);
        const url = await getDownloadURL(storageRef);
        formData.set('controleTechniqueUrl', url);
      }

      formData.delete('images');
      formData.delete('controleTechnique');

      formData.append('existingImages', JSON.stringify(existingImages));

      await updateCar(resolvedParams.id, formData);
      alert("✅ Les informations du véhicule ont été mises à jour !");
      router.push('/admin');
    } catch (error) {
      console.error(error);
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
              <h2>{dict.adminForm?.presentationLabel || "Informations du véhicule"}</h2>
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
                  <label htmlFor="prix">{dict.adminForm?.priceLabel || "Prix affiché (ex: 18 500 000 DZD)"}</label>
                  <input type="text" id="prix" name="prix" defaultValue={car.prix} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="status">{dict.adminForm?.statusLabel || "Statut dans le showroom"}</label>
                  <select id="status" name="status" defaultValue={car.status || "Disponible"} className={styles.select}>
                    <option value="Disponible">{dict.adminForm?.statusAvailable || "🟢 Disponible"}</option>
                    <option value="En arrivage">{dict.adminForm?.statusIncoming || "⏳ En arrivage"}</option>
                    <option value="Réservé">{dict.adminForm?.statusReserved || "🟡 Réservé"}</option>
                    <option value="Vendu">{dict.adminForm?.statusSold || "🔴 Vendu"}</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="energie">{dict.adminForm?.energyLabel || "Énergie"}</label>
                  <select id="energie" name="energie" defaultValue={car.energie} className={styles.select}>
                    <option value="Essence">{dict.adminForm?.energyGasoline || "Essence"}</option>
                    <option value="Diesel">{dict.adminForm?.energyDiesel || "Diesel"}</option>
                    <option value="Hybride">{dict.adminForm?.energyHybrid || "Hybride"}</option>
                    <option value="Électrique">{dict.adminForm?.energyElectric || "Électrique"}</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="boite">{dict.adminForm?.gearboxLabel || "Boîte de vitesses"}</label>
                  <select id="boite" name="boite" defaultValue={car.boite} className={styles.select}>
                    <option value="Automatique">{dict.adminForm?.gearboxAuto || "Automatique"}</option>
                    <option value="Manuelle">{dict.adminForm?.gearboxManual || "Manuelle"}</option>
                  </select>
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="couleur">{dict.adminForm?.colorLabel || "Couleur extérieure & intérieure"}</label>
                  <input type="text" id="couleur" name="couleur" defaultValue={car.couleur} required className={styles.input} />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>{dict.adminForm?.descLabel || "Description & Détails"}</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="description">{dict.adminForm?.presentationLabel || "Présentation complète"}</label>
                <textarea id="description" name="description" rows={5} defaultValue={car.description} required className={styles.textarea} />
              </div>

              {existingImages.length > 0 && (
                <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                  <label>Photos existantes (Gérer, Supprimer, Réorganiser)</label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {existingImages.map((url, index) => (
                      <div key={index} style={{ position: 'relative', width: '150px', height: '150px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Photo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0,0,0,0.6)', padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button type="button" onClick={() => handleMoveLeft(index)} disabled={index === 0} style={{ background: 'none', border: 'none', color: index === 0 ? 'gray' : 'white', cursor: index === 0 ? 'default' : 'pointer' }}>◀️</button>
                          <button type="button" onClick={() => handleDeleteImage(index)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️</button>
                          <button type="button" onClick={() => handleMoveRight(index)} disabled={index === existingImages.length - 1} style={{ background: 'none', border: 'none', color: index === existingImages.length - 1 ? 'gray' : 'white', cursor: index === existingImages.length - 1 ? 'default' : 'pointer' }}>▶️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                <label htmlFor="images">Ajouter de nouvelles photos</label>
                <input 
                  type="file" 
                  id="images"
                  name="images"
                  multiple 
                  accept="image/*" 
                  className={styles.input}
                  style={{ padding: '0.5rem', background: 'var(--color-bg-secondary)' }}
                />
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
