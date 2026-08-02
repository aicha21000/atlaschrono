import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className={styles.carsContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Notre Catalogue de Véhicules</h1>
          <p className={styles.subtitle}>Filtrez et trouvez le véhicule d'occasion idéal, fraîchement importé.</p>
        </header>
        
        <div className={styles.layout}>
          <aside className={styles.filters}>
            <h3>Filtres</h3>
            <div className={styles.filterGroup}>
              <label>Marque</label>
              <select className={styles.select}>
                <option>Toutes les marques</option>
                <option>Mercedes-Benz</option>
                <option>BMW</option>
                <option>Audi</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Énergie</label>
              <select className={styles.select}>
                <option>Toutes</option>
                <option>Essence</option>
                <option>Diesel</option>
                <option>Hybride</option>
                <option>Électrique</option>
              </select>
            </div>
            <button className={styles.applyBtn}>Appliquer les filtres</button>
          </aside>
          
          <main className={styles.carGrid}>
            {cars.map((car: any) => (
              <div key={car.id} className={`glass-panel ${styles.carCard}`}>
                <div className={styles.carImagePlaceholder}>Image {car.marque}</div>
                <div className={styles.carInfo}>
                  <h3>{car.marque} {car.modele}</h3>
                  <p className={styles.carDetails}>{car.annee} • {car.kilometrage} km • {car.energie}</p>
                  <p className={styles.carPrice}>{car.prix}</p>
                  <Link href={`/cars/${car.id}`} className={styles.detailsBtn}>Voir détails</Link>
                </div>
              </div>
            ))}
            
            {cars.length === 0 && (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#a3a3a3'}}>
                Aucun véhicule disponible pour le moment.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
