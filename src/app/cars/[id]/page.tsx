import styles from './page.module.css';
import Link from 'next/link';
import { getCars, incrementCarViews } from '@/actions/cars';
import { notFound } from 'next/navigation';
import CarGallery from '@/components/CarGallery/CarGallery';

export default async function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const cars = await getCars();
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
            
            <div className={styles.contactCard}>
              <h3>Intéressé par ce véhicule ?</h3>
              <p>Contactez-nous pour l'importation de ce modèle.</p>
              <button className={styles.contactBtn}>Nous contacter</button>
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
