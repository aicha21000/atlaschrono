import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Premium Auto DZ</h1>
          <p className={styles.subtitle}>
            Véhicules d'occasion de prestige, importés pour vous.
          </p>
          <div className={styles.actions}>
            <a href="/cars" className={styles.primaryBtn}>Voir le catalogue</a>
            <a href="/contact" className={styles.secondaryBtn}>Nous contacter</a>
          </div>
        </div>
      </header>
      
      <section className={styles.recentCars}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Nouveautés en showroom</h2>
          <div className={styles.grid}>
            {/* Placeholder for cars */}
            <div className={`glass-panel ${styles.carCard}`}>
              <div className={styles.carImagePlaceholder}>Image Mercedes</div>
              <div className={styles.carInfo}>
                <h3>Mercedes-Benz Classe A</h3>
                <p className={styles.carDetails}>2022 • 25 000 km • Diesel</p>
                <p className={styles.carPrice}>Sur commande</p>
              </div>
            </div>
            <div className={`glass-panel ${styles.carCard}`}>
              <div className={styles.carImagePlaceholder}>Image Audi</div>
              <div className={styles.carInfo}>
                <h3>Audi A3 Sportback</h3>
                <p className={styles.carDetails}>2023 • 12 000 km • Essence</p>
                <p className={styles.carPrice}>Sur commande</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
