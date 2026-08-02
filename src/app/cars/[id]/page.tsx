import styles from './page.module.css';
import Link from 'next/link';
import { getCars, incrementCarViews } from '@/actions/cars';
import { getSettings } from '@/actions/settings';
import { notFound } from 'next/navigation';
import CarGallery from '@/components/CarGallery/CarGallery';

export default async function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const cars = await getCars();
  const settings = await getSettings();
  const car = cars.find((c: any) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  await incrementCarViews(resolvedParams.id);

  return (
    <div className={styles.detailsContainer}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/cars">Catalogue</Link> &gt; <span>{car.marque} {car.modele}</span>
        </div>
        
        <div className={styles.mainLayout}>
          <CarGallery images={car.images} altText={`${car.marque} ${car.modele}`} />
          
          <div className={styles.infoPanel}>
            {(() => {
              const status = car.status || "Disponible";
              const badgeText = status === "Réservé" 
                ? "🟡 Véhicule Réservé" 
                : status === "Vendu" 
                ? "🔴 Véhicule Vendu" 
                : status === "En arrivage"
                ? "⏳ En arrivage prochainement"
                : "🟢 Disponible au showroom";

              const badgeStyle = status === "Réservé" 
                ? { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' } 
                : status === "Vendu" 
                ? { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } 
                : status === "En arrivage"
                ? { background: '#eff6ff', color: '#1e40af', border: '1px solid #93c5fd' }
                : { background: '#dcfce7', color: '#166534', border: '1px solid #86efac' };

              return (
                <span style={{ display: 'inline-block', padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', ...badgeStyle }}>
                  {badgeText}
                </span>
              );
            })()}

            <h1 className={styles.title}>{car.marque} {car.modele}</h1>
            <p className={styles.price}>{car.prix}</p>
            
            <div className={`glass-panel ${styles.quickStats}`}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Année</span>
                <span className={styles.statValue}>{car.annee}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Kilométrage</span>
                <span className={styles.statValue}>{car.kilometrage} km</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Énergie</span>
                <span className={styles.statValue}>{car.energie}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Boîte</span>
                <span className={styles.statValue}>{car.boite}</span>
              </div>
            </div>

            {/* CARTE CONTRÔLE TECHNIQUE & INSPECTION OFFICIELLE */}
            <div className="glass-panel" style={{ 
              padding: '1.25rem', 
              borderRadius: '16px', 
              marginBottom: '1.5rem',
              border: '1px solid rgba(0, 85, 255, 0.25)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)',
              boxShadow: '0 8px 25px rgba(0, 85, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>🛡️</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
                      Contrôle Technique
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Rapport officiel d&apos;expertise et de conformité
                    </p>
                  </div>
                </div>
                {car.controleTechnique ? (
                  <span style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: '#dcfce7',
                    color: '#166534',
                    border: '1px solid #86efac'
                  }}>
                    ✅ Vérifié
                  </span>
                ) : (
                  <span style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-secondary)'
                  }}>
                    Sur demande
                  </span>
                )}
              </div>

              {car.controleTechnique ? (
                <div>
                  {/* Aperçu visuel si c'est une image (jpg/png/webp) */}
                  {!car.controleTechnique.toLowerCase().endsWith('.pdf') ? (
                    <div style={{ 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      marginBottom: '1rem', 
                      height: '150px', 
                      border: '1px solid var(--color-border)',
                      position: 'relative',
                      background: '#000'
                    }}>
                      <img 
                        src={car.controleTechnique} 
                        alt="Aperçu du certificat de contrôle technique" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
                        padding: '0.5rem',
                        color: '#fff',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 600
                      }}>
                        📄 Document original certifié conforme
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem',
                      background: 'rgba(0, 85, 255, 0.06)',
                      borderRadius: '10px',
                      marginBottom: '1rem',
                      border: '1px solid rgba(0, 85, 255, 0.15)'
                    }}>
                      <span style={{ fontSize: '2rem' }}>📑</span>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                          Rapport_Inspection_CT.pdf
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          Document officiel PDF téléchargeable
                        </span>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <a 
                      href={car.controleTechnique} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        background: '#ffffff',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      👁️ Consulter
                    </a>
                    <a 
                      href={car.controleTechnique} 
                      download={`Controle-Technique-${car.marque}-${car.modele}`}
                      style={{
                        flex: 1.2,
                        textAlign: 'center',
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, #0099ff 100%)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0, 85, 255, 0.25)',
                        transition: 'all 0.2s'
                      }}
                    >
                      📥 Télécharger
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '0.85rem', 
                  background: 'var(--color-bg-secondary)', 
                  borderRadius: '10px',
                  color: 'var(--color-text-secondary)'
                }}>
                  <p style={{ fontSize: '0.85rem', margin: '0 0 0.4rem 0' }}>
                    Rapport d&apos;inspection technique disponible en agence.
                  </p>
                  <Link href="/contact" style={{ 
                    color: 'var(--color-accent)', 
                    fontWeight: 700, 
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}>
                    Demander le rapport par e-mail &rarr;
                  </Link>
                </div>
              )}
            </div>
            
            <div className={styles.contactCard}>
              <h3>
                {(car.status || "Disponible") === "Vendu" 
                  ? "Modèle similaire recherché ?" 
                  : (car.status || "Disponible") === "Réservé" 
                  ? "Véhicule sous réservation" 
                  : (car.status || "Disponible") === "En arrivage"
                  ? "Pré-réserver ce véhicule ?"
                  : "Intéressé par ce véhicule ?"}
              </h3>
              
              {(car.status || "Disponible") === "Vendu" && (
                <p style={{ color: '#991b1b', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  ❌ Ce véhicule est vendu. Notre équipe peut vous importer un modèle similaire sur commande !
                </p>
              )}
              
              {(car.status || "Disponible") === "Réservé" && (
                <p style={{ color: '#854d0e', backgroundColor: '#fef9c3', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  ⚠️ Ce véhicule est actuellement réservé. Contactez-nous en cas d&apos;annulation !
                </p>
              )}

              {(car.status || "Disponible") === "En arrivage" && (
                <p style={{ color: '#1e40af', backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem', border: '1px solid #bfdbfe' }}>
                  ⏳ Ce véhicule est en cours d&apos;acheminement vers notre showroom. Pré-réservez-le dès maintenant avant son arrivée !
                </p>
              )}

              <p style={{ marginBottom: '0.5rem' }}>Contactez notre équipe au : <strong>{settings.phone}</strong></p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Ou venez nous rendre visite au showroom.</p>
              <Link href="/contact" style={{ display: 'block', textDecoration: 'none' }}>
                <button className={styles.contactBtn}>Nous envoyer un message</button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.detailsSection}>
          <h2>Toutes les caractéristiques</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Marque</span>
              <span className={styles.featureValue}>{car.marque}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Modèle</span>
              <span className={styles.featureValue}>{car.modele}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Couleur</span>
              <span className={styles.featureValue}>{car.couleur}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Description</span>
              <span className={styles.featureValue}>{car.description || "Aucune description fournie"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
