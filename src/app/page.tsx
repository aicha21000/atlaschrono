import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';

export default async function Home() {
  const allCars = await getCars();
  // Afficher seulement les 3 plus récents (ceux à la fin du tableau)
  const recentCars = allCars.slice(-3).reverse();

  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroText}>
            <h1 className={`${styles.title} chrome-text`}>Premium Auto DZ</h1>
            <p className={styles.subtitle}>
              Véhicules d'occasion de prestige, importés pour vous.
            </p>
            <div className={styles.actions}>
              <a href="/cars" className={styles.primaryBtn}>Voir le catalogue</a>
              <a href="/contact" className={styles.secondaryBtn}>Nous contacter</a>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img src="/images/banner.png" alt="Showroom Premium Auto DZ" className={styles.heroImage} />
              <div className={styles.heroImageOverlay}></div>
            </div>
          </div>
        </div>
      </header>
      
      <section className={styles.recentCars}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Nouveautés en showroom</h2>
          <div className={styles.grid}>
            {recentCars.map((car: any) => (
               <div key={car.id} className={`glass-panel ${styles.carCard}`}>
                <div className={styles.carImagePlaceholder}>
                  {car.images && car.images.length > 0 ? (
                    <img src={car.images[0]} alt={`${car.marque} ${car.modele}`} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center'}} />
                  ) : (
                    <span>Image {car.marque}</span>
                  )}
                </div>
                <div className={styles.carInfo}>
                  <h3>{car.marque} {car.modele}</h3>
                  <p className={styles.carDetails}>{car.annee} • {car.kilometrage} km • {car.energie}</p>
                  <p className={styles.carPrice}>{car.prix}</p>
                  <Link href={`/cars/${car.id}`} style={{display:'block', textAlign:'center', marginTop:'1rem', padding:'0.5rem', border:'1px solid var(--color-border)', borderRadius:'6px', transition:'background 0.2s'}}>Voir détails</Link>
                </div>
              </div>
            ))}

            {recentCars.length === 0 && (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#a3a3a3'}}>
                Aucun véhicule disponible pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
