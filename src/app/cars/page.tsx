import styles from './page.module.css';
import Link from 'next/link';

export default function CarsPage() {
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
             <div className={`glass-panel ${styles.carCard}`}>
              <div className={styles.carImagePlaceholder}>Image Mercedes</div>
              <div className={styles.carInfo}>
                <h3>Mercedes-Benz Classe A</h3>
                <p className={styles.carDetails}>2022 • 25 000 km • Diesel</p>
                <p className={styles.carPrice}>Sur commande</p>
                <Link href="/cars/1" className={styles.detailsBtn}>Voir détails</Link>
              </div>
            </div>
            <div className={`glass-panel ${styles.carCard}`}>
              <div className={styles.carImagePlaceholder}>Image Audi</div>
              <div className={styles.carInfo}>
                <h3>Audi A3 Sportback</h3>
                <p className={styles.carDetails}>2023 • 12 000 km • Essence</p>
                <p className={styles.carPrice}>Sur commande</p>
                <Link href="/cars/2" className={styles.detailsBtn}>Voir détails</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
