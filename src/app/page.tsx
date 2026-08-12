import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';
import { getDictionary } from '@/i18n/getLang';
import { getSettings } from '@/actions/settings';
import { formatPrice } from '@/lib/format';

export default async function Home() {
  const dict = await getDictionary();
  const allCars = await getCars();
  const settings = await getSettings();

  const translateEnergy = (energy: string) => {
    if (energy === "Essence") return dict.adminForm?.energyGasoline || energy;
    if (energy === "Diesel") return dict.adminForm?.energyDiesel || energy;
    if (energy === "Hybride") return dict.adminForm?.energyHybrid || energy;
    if (energy === "Électrique") return dict.adminForm?.energyElectric || energy;
    return energy;
  };
  // Afficher seulement les 3 plus récents (ceux à la fin du tableau)
  const recentCars = allCars.slice(-3).reverse();

  return (
    <div className={styles.homeContainer}>
      {/* SECTION HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✨</span> {dict.home.heroBadge.replace('✨ ', '')}
            </div>
            <h1 id="hero-title" className={`${styles.title} chrome-text`}>
              Atlas Chrono Cars
            </h1>
            <p className={styles.subtitle}>
              {dict.home.heroSubtitle}
            </p>
            <div className={styles.actions}>
              <Link href="/cars" className={styles.primaryBtn} aria-label="Explorer le stock de véhicules">
                {dict.home.btnStock}
              </Link>
              <Link href="/contact" className={styles.secondaryBtn} aria-label="Demander une importation sur mesure">
                {dict.home.btnContact}
              </Link>
            </div>

            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <strong>{dict.home.trust1Title}</strong>
                <span>{dict.home.trust1Desc}</span>
              </div>
              <div className={styles.trustItem}>
                <strong>{dict.home.trust2Title}</strong>
                <span>{dict.home.trust2Desc}</span>
              </div>
              <div className={styles.trustItem}>
                <strong>{dict.home.trust3Title}</strong>
                <span>{dict.home.trust3Desc}</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img 
                src="/images/banner.png" 
                alt="Showroom Atlas Chrono Cars" 
                className={styles.heroImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className={styles.heroImageOverlay}></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION NOUVEAUTÉS */}
      <section className={styles.recentCars} aria-labelledby="nouveautes-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 id="nouveautes-title" className={styles.sectionTitle}>{dict.home.recentTitle}</h2>
              <p className={styles.sectionSubtitle}>{dict.home.recentSubtitle}</p>
            </div>
            <Link href="/cars" className={styles.viewAllLink} aria-label="Voir l'ensemble du catalogue">
              {dict.home.viewAll}
            </Link>
          </div>

          <div className={styles.grid}>
            {recentCars.map((car: any) => {
              const status = car.status || "Disponible";
              const badgeText = status === "Réservé" ? dict.cars.statusReserved : status === "Vendu" ? dict.cars.statusSold : status === "En arrivage" ? dict.cars.statusIncoming : dict.cars.statusAvailable;
              const badgeStyle = status === "Réservé" 
                ? { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' } 
                : status === "Vendu" 
                ? { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } 
                : status === "En arrivage"
                ? { background: '#eff6ff', color: '#1e40af', border: '1px solid #93c5fd' }
                : { background: 'rgba(15, 23, 42, 0.85)', color: '#ffffff' };

              return (
               <article key={car.id} className={`glass-panel ${styles.carCard}`}>
                <div className={styles.carImagePlaceholder}>
                  <span className={styles.stockBadge} style={badgeStyle}>{badgeText}</span>
                  {car.images && car.images.length > 0 ? (
                    <img 
                      src={car.images[0]} 
                      alt={`${car.marque} ${car.modele} ${car.annee}`} 
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span>Image {car.marque}</span>
                  )}
                </div>
                <div className={styles.carInfo}>
                  <h3>{car.marque} {car.modele}</h3>
                  <p className={styles.carDetails}>
                    <span>{car.annee}</span> &bull; <span>{car.kilometrage.toLocaleString('fr-FR')} {dict.home.cardKm}</span> &bull; <span>{translateEnergy(car.energie)}</span>
                  </p>
                  <p className={styles.carPrice}>{formatPrice(car.prix)}</p>
                  <Link href={`/cars/${car.id}`} className={styles.cardCta} aria-label={`Consulter la fiche technique de la ${car.marque} ${car.modele}`}>
                    {dict.home.cardCta}
                  </Link>
                </div>
              </article>
              );
            })}

            {recentCars.length === 0 && (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)'}}>
                {dict.home.noCars}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION ENGAGEMENTS */}
      <section className={styles.featuresSection} aria-labelledby="engagements-title">
        <div className="container">
          <div className={styles.featuresHeader}>
            <h2 id="engagements-title" className={styles.sectionTitle}>{dict.home.engagementsTitle}</h2>
            <p className={styles.sectionSubtitle}>{dict.home.engagementsSubtitle}</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">🔍</div>
              <h3>{dict.home.feat1Title}</h3>
              <p>{dict.home.feat1Desc}</p>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">🛡️</div>
              <h3>{dict.home.feat2Title}</h3>
              <p>{dict.home.feat2Desc}</p>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">🤝</div>
              <h3>{dict.home.feat3Title}</h3>
              <p>{dict.home.feat3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
