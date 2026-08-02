import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';
import AdminLogoutBtn from '@/components/AdminLogoutBtn/AdminLogoutBtn';
import AdminTable from '@/components/AdminTable/AdminTable';

export default async function AdminDashboard() {
  const cars = await getCars();
  
  // 1. Calcul du total des vues
  const totalViews = cars.reduce((acc: number, car: any) => acc + (Number(car.views) || 0), 0);

  // 2. Calcul de la valeur financière du stock (en DZD)
  const totalValue = cars.reduce((acc: number, car: any) => {
    const rawPrice = Number(car.prix.toString().replace(/[^0-9]/g, '')) || 0;
    return acc + rawPrice;
  }, 0);

  // 3. Calcul du prix moyen d'un véhicule
  const avgPrice = cars.length > 0 ? Math.round(totalValue / cars.length) : 0;

  // 4. Véhicule le plus consulté par les clients
  const mostViewedCar = cars.length > 0 
    ? [...cars].sort((a: any, b: any) => (Number(b.views) || 0) - (Number(a.views) || 0))[0] 
    : null;

  // 5. Répartition par statut dans le showroom
  const onlineCount = cars.filter((c: any) => !c.status || c.status === "En ligne").length;
  const reservedCount = cars.filter((c: any) => c.status === "Réservé").length;
  const soldCount = cars.filter((c: any) => c.status === "Vendu").length;

  return (
    <AdminAuthGuard>
      <div className={styles.dashboardContainer}>
        <div className="container">
          {/* EN-TÊTE DU TABLEAU DE BORD */}
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Tableau de bord Showroom</h1>
              <p className={styles.subtitle}>Pilotage en temps réel du stock, de la valeur financière et de la popularité</p>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/admin/settings" className={styles.secondaryBtn}>
                <span>⚙️</span> Paramètres
              </Link>
              <Link href="/admin/cars/new" className={styles.addBtn}>
                <span>+</span> Ajouter un véhicule
              </Link>
              <AdminLogoutBtn />
            </div>
          </header>

          {/* GRILLE DES 5 STATISTIQUES FINANCIÈRES & COMMERCIALES */}
          <section aria-label="Indicateurs clés de performance" className={styles.statsRow}>
            {/* KPI 1 : VÉHICULES EN STOCK */}
            <div className={`glass-panel ${styles.statCard}`}>
              <div className={styles.statCardHeader}>
                <h3>Parc Automobile</h3>
                <div className={styles.statIcon}>🚗</div>
              </div>
              <p className={styles.statValue}>{cars.length}</p>
              <p className={styles.statBadge}>
                {onlineCount} en ligne • {reservedCount} réservés • {soldCount} vendus
              </p>
            </div>

            {/* KPI 2 : VALEUR GLOBALE DU SHOWROOM */}
            <div className={`glass-panel ${styles.statCard}`}>
              <div className={styles.statCardHeader}>
                <h3>Valeur Totale du Stock</h3>
                <div className={styles.statIcon}>💎</div>
              </div>
              <p className={styles.statValue}>
                {totalValue > 0 ? `${totalValue.toLocaleString('fr-FR')} DZD` : "—"}
              </p>
              <p className={styles.statBadge}>Capital automobile actif</p>
            </div>

            {/* KPI 3 : PRIX MOYEN PAR VÉHICULE */}
            <div className={`glass-panel ${styles.statCard}`}>
              <div className={styles.statCardHeader}>
                <h3>Prix Moyen Affiché</h3>
                <div className={styles.statIcon}>📈</div>
              </div>
              <p className={styles.statValue}>
                {avgPrice > 0 ? `${avgPrice.toLocaleString('fr-FR')} DZD` : "—"}
              </p>
              <p className={styles.statBadge}>Panier moyen showroom</p>
            </div>

            {/* KPI 4 : VUES CLIENTÈLE */}
            <div className={`glass-panel ${styles.statCard}`}>
              <div className={styles.statCardHeader}>
                <h3>Vues Clientèle</h3>
                <div className={styles.statIcon}>👁️</div>
              </div>
              <p className={styles.statValue}>{totalViews.toLocaleString('fr-FR')}</p>
              <p className={styles.statBadge}>Intérêt cumulé sur le catalogue</p>
            </div>

            {/* KPI 5 : MODÈLE LE PLUS POPULAIRE */}
            <div className={`glass-panel ${styles.statCard}`}>
              <div className={styles.statCardHeader}>
                <h3>Véhicule #1 Consulté</h3>
                <div className={styles.statIcon}>🏆</div>
              </div>
              <p className={styles.statValue} style={{ fontSize: '1.45rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {mostViewedCar ? `${mostViewedCar.marque} ${mostViewedCar.modele}` : "Aucun"}
              </p>
              <p className={styles.statBadge}>
                {mostViewedCar ? `${mostViewedCar.views || 0} vues sur l'annonce` : "En attente de visites"}
              </p>
            </div>
          </section>

          {/* GESTION INTERACTIVE DU STOCK */}
          <section className={styles.listSection} aria-labelledby="stock-table-title">
            <div>
              <h2 id="stock-table-title" className={styles.sectionTitle}>Gestion du catalogue & Statut showroom</h2>
              <p className={styles.sectionSubtitle}>
                Recherchez un véhicule, filtrez par disponibilité ou modifiez le statut d&apos;une vente en 1 clic.
              </p>
            </div>
            
            <AdminTable cars={cars} />
          </section>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
