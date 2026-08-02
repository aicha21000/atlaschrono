import styles from './page.module.css';
import Link from 'next/link';

export default function CarDetails() {
  return (
    <div className={styles.detailsContainer}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/cars">Catalogue</Link> &gt; <span>Mercedes-Benz Classe A</span>
        </div>
        
        <div className={styles.mainLayout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              Image Principale
            </div>
            <div className={styles.thumbnails}>
              <div className={styles.thumb}>Img 1</div>
              <div className={styles.thumb}>Img 2</div>
              <div className={styles.thumb}>Img 3</div>
            </div>
          </div>
          
          <div className={styles.infoPanel}>
            <h1 className={styles.title}>Mercedes-Benz Classe A</h1>
            <p className={styles.price}>Sur commande</p>
            
            <div className={`glass-panel ${styles.quickStats}`}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Année</span>
                <span className={styles.statValue}>2022</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Kilométrage</span>
                <span className={styles.statValue}>25 000 km</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Énergie</span>
                <span className={styles.statValue}>Diesel</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Boîte</span>
                <span className={styles.statValue}>Auto</span>
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
              <span className={styles.featureValue}>Mercedes-Benz</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Modèle</span>
              <span className={styles.featureValue}>Classe A</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Couleur</span>
              <span className={styles.featureValue}>Noir</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureLabel}>Puissance DIN</span>
              <span className={styles.featureValue}>150 ch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
