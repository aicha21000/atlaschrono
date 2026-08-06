import styles from './page.module.css';
import Link from 'next/link';
import { getCars, incrementCarViews } from '@/actions/cars';
import { getSettings } from '@/actions/settings';
import { notFound } from 'next/navigation';
import CarGallery from '@/components/CarGallery/CarGallery';
import ControleTechniqueViewer from '@/components/ControleTechniqueViewer/ControleTechniqueViewer';
import StripeReservationButton from '@/components/StripeReservationButton/StripeReservationButton';
import { getDictionary } from '@/i18n/getLang';

export default async function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const cars = await getCars();
  const settings = await getSettings();
  const dict = await getDictionary();
  const car = cars.find((c: any) => c.id === resolvedParams.id);

  if (!car) {
    notFound();
  }

  await incrementCarViews(resolvedParams.id);

  return (
    <div className={styles.detailsContainer}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/cars">{dict.navbar.stock}</Link> &gt; <span>{car.marque} {car.modele}</span>
        </div>
        
        <div className={styles.mainLayout}>
          <CarGallery images={car.images} altText={`${car.marque} ${car.modele}`} />
          
          <div className={styles.infoPanel}>
            {(() => {
              const status = car.status || "Disponible";
              const badgeText = status === "Réservé" 
                ? dict.cars.statusReserved 
                : status === "Vendu" 
                ? dict.cars.statusSold 
                : status === "En arrivage"
                ? dict.cars.statusIncoming
                : dict.cars.statusAvailable;

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
                <span className={styles.statLabel}>{dict.cars.specYear}</span>
                <span className={styles.statValue}>{car.annee}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>{dict.cars.specKm}</span>
                <span className={styles.statValue}>{car.kilometrage} km</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>{dict.cars.specEnergy}</span>
                <span className={styles.statValue}>{car.energie}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>{dict.cars.specGearbox}</span>
                <span className={styles.statValue}>{car.boite}</span>
              </div>
            </div>

            {/* CARTE CONTRÔLE TECHNIQUE */}
            <ControleTechniqueViewer 
              fileUrl={car.controleTechnique} 
              carTitle={`${car.marque} ${car.modele}`} 
              dict={dict}
            />

            {/* CARTE DE RÉSERVATION EN LIGNE AVEC ACOMPTE DE 100 EUR STRIPE */}
            <StripeReservationButton
              carId={car.id}
              carTitle={`${car.marque} ${car.modele}`}
              carPrice={car.prix}
              carStatus={car.status || "Disponible"}
              dict={dict}
            />
            
            <div className={styles.contactCard}>
              <h3>{dict.navbar.contact}</h3>
              <p style={{ marginBottom: '0.5rem' }}>{settings.phone}</p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{settings.email}</p>
              <Link href="/contact" style={{ display: 'block', textDecoration: 'none' }}>
                <button className={styles.contactBtn}>{dict.navbar.contact}</button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.detailsSection}>
          <h2>{dict.cars.detailsTitle}</h2>
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
              <span className={styles.featureLabel}>{dict.cars.specColor}</span>
              <span className={styles.featureValue}>{car.couleur}</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Description</span>
              <span className={styles.featureValue}>{car.description || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
