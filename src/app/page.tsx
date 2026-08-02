import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';

export default async function Home() {
  const allCars = await getCars();
  // Afficher seulement les 3 plus récents (ceux à la fin du tableau)
  const recentCars = allCars.slice(-3).reverse();

  return (
    <div className={styles.homeContainer}>
      {/* SECTION HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>✨</span> Spécialiste de l'Importation Prestige en Algérie
            </div>
            <h1 id="hero-title" className={`${styles.title} chrome-text`}>
              Premium Auto DZ
            </h1>
            <p className={styles.subtitle}>
              Une sélection exclusive de véhicules d&apos;occasion récents de moins de 3 ans, inspectés et certifiés. Qualité allemande, transparence totale et accompagnement sur-mesure.
            </p>
            <div className={styles.actions}>
              <Link href="/cars" className={styles.primaryBtn} aria-label="Explorer le stock de véhicules">
                Explorer le stock <span>&rarr;</span>
              </Link>
              <Link href="/contact" className={styles.secondaryBtn} aria-label="Demander une importation sur mesure">
                Importation sur mesure
              </Link>
            </div>

            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <strong>100% Certifiés</strong>
                <span>Historique & kilométrage vérifiés</span>
              </div>
              <div className={styles.trustItem}>
                <strong>Import Direct</strong>
                <span>Formalités & douane gérées</span>
              </div>
              <div className={styles.trustItem}>
                <strong>Garantie 12m</strong>
                <span>Sérénité absolue en Algérie</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img 
                src="/images/banner.png" 
                alt="Showroom Premium Auto DZ - Véhicules de prestige en Algérie" 
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
              <h2 id="nouveautes-title" className={styles.sectionTitle}>Nouveautés en showroom</h2>
              <p className={styles.sectionSubtitle}>Découvrez nos derniers véhicules arrivés et prêts pour livraison</p>
            </div>
            <Link href="/cars" className={styles.viewAllLink} aria-label="Voir l'ensemble du catalogue">
              Voir tout le stock <span>&rarr;</span>
            </Link>
          </div>

          <div className={styles.grid}>
            {recentCars.map((car: any) => {
              const status = car.status || "Disponible";
              const badgeText = status === "Réservé" ? "🟡 Réservé" : status === "Vendu" ? "🔴 Vendu" : "🟢 Disponible";
              const badgeStyle = status === "Réservé" 
                ? { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' } 
                : status === "Vendu" 
                ? { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } 
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
                    <span>{car.annee}</span> &bull; <span>{car.kilometrage.toLocaleString('fr-FR')} km</span> &bull; <span>{car.energie}</span>
                  </p>
                  <p className={styles.carPrice}>{car.prix}</p>
                  <Link href={`/cars/${car.id}`} className={styles.cardCta} aria-label={`Consulter la fiche technique de la ${car.marque} ${car.modele}`}>
                    Consulter la fiche &rarr;
                  </Link>
                </div>
              </article>
              );
            })}

            {recentCars.length === 0 && (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)'}}>
                Aucun véhicule disponible pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION ENGAGEMENTS / LUXURY FEATURES */}
      <section className={styles.featuresSection} aria-labelledby="engagements-title">
        <div className="container">
          <div className={styles.featuresHeader}>
            <h2 id="engagements-title" className={styles.sectionTitle}>L&apos;Excellence Premium Auto DZ</h2>
            <p className={styles.sectionSubtitle}>Pourquoi les passionnés d&apos;automobile en Algérie nous font confiance pour leur prochain véhicule</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">💎</div>
              <h3>Sélection Rigoureuse</h3>
              <p>Chaque véhicule fait l&apos;objet d&apos;une inspection technique complète en 120 points par nos experts avant l&apos;expédition vers l&apos;Algérie.</p>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">🛡️</div>
              <h3>Transparence Absolue</h3>
              <p>Aucune mauvaise surprise : carnet d&apos;entretien complet vérifié, kilométrage réel certifié et traçabilité européenne limpide.</p>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} aria-hidden="true">🚀</div>
              <h3>Accompagnement VIP</h3>
              <p>Nous gérons pour vous l&apos;intégralité du processus : logistique, transport maritime, formalités douanières et livraison en showroom.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
