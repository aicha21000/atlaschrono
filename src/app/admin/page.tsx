import styles from './page.module.css';
import Link from 'next/link';
import { getCars, deleteCar } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';
import AdminLogoutBtn from '@/components/AdminLogoutBtn/AdminLogoutBtn';

export default async function AdminDashboard() {
  const cars = await getCars();
  const totalViews = cars.reduce((sum: number, c: any) => sum + (Number(c.views) || 0), 0);
  const mostViewed = cars.length > 0 ? [...cars].sort((a: any, b: any) => (Number(b.views) || 0) - (Number(a.views) || 0))[0] : null;

  return (
    <AdminAuthGuard>
      <div className={styles.dashboardContainer}>
        <div className="container">
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Tableau de bord</h1>
              <p className={styles.subtitle}>Gérez votre catalogue de véhicules</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AdminLogoutBtn />
              <Link href="/admin/cars/new" className={styles.addBtn}>
                + Ajouter un véhicule
              </Link>
            </div>
          </header>

        <section className={styles.statsRow}>
           <div className={`glass-panel ${styles.statCard}`}>
            <h3>Véhicules en ligne</h3>
            <p className={styles.statValue}>{cars.length}</p>
           </div>
           <div className={`glass-panel ${styles.statCard}`}>
            <h3>Vues totales des annonces</h3>
            <p className={styles.statValue}>{totalViews}</p>
           </div>
           <div className={`glass-panel ${styles.statCard}`}>
            <h3>Véhicule le plus vu</h3>
            <p className={styles.statValue} style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
              {mostViewed ? `${mostViewed.marque} ${mostViewed.modele} (${mostViewed.views || 0} vues)` : 'Aucun'}
            </p>
           </div>
        </section>

        <section className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Véhicules récents</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Modèle</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Vues</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car: any) => (
                  <tr key={car.id}>
                    <td>{car.marque} {car.modele}</td>
                    <td>{car.annee}</td>
                    <td>{car.prix}</td>
                    <td><strong style={{ color: 'var(--color-accent)' }}>{car.views || 0}</strong></td>
                    <td><span className={styles.badgeSuccess}>{car.status}</span></td>
                    <td>
                      <button className={styles.actionBtn}>Modifier</button>
                      <form action={async () => { "use server"; await deleteCar(car.id); }} style={{ display: 'inline' }}>
                        <button type="submit" className={`${styles.actionBtn} ${styles.danger}`}>Supprimer</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Aucun véhicule en stock.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
    </AdminAuthGuard>
  );
}
