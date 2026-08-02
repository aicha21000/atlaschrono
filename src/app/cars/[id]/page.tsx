import styles from './page.module.css';
import Link from 'next/link';
import { getCars, incrementCarViews } from '@/actions/cars';
import { getSettings } from '@/actions/settings';
import { notFound } from 'next/navigation';
import CarGallery from '@/components/CarGallery/CarGallery';
import ControleTechniqueViewer from '@/components/ControleTechniqueViewer/ControleTechniqueViewer';

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

            {/* CARTE CONTRÔLE TECHNIQUE (EFFET ÉVENTAIL & OVERLAY AU-DESSUS DE LA PAGE) */}
            <ControleTechniqueViewer 
              fileUrl={car.controleTechnique} 
              carTitle={`${car.marque} ${car.modele}`} 
            />
            
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
