import styles from './page.module.css';
import Link from 'next/link';
import { getCars, deleteCar } from '@/actions/cars';

export default async function AdminDashboard() {
  const cars = await getCars();

  return (
    <div className={styles.dashboardContainer}>
      <div className="container">
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Tableau de bord</h1>
            <p className={styles.subtitle}>Gérez votre catalogue de véhicules</p>
          </div>
          <Link href="/admin/cars/new" className={styles.addBtn}>
            + Ajouter un véhicule
          </Link>
        </header>

        <section className={styles.statsRow}>
           <div className={`glass-panel ${styles.statCard}`}>
            <h3>Véhicules en ligne</h3>
            <p className={styles.statValue}>{cars.length}</p>
           </div>
           <div className={`glass-panel ${styles.statCard}`}>
            <h3>Vues ce mois-ci</h3>
            <p className={styles.statValue}>124</p>
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
                    <td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>Aucun véhicule en stock.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
