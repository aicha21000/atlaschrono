import styles from './page.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
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
            <p className={styles.statValue}>2</p>
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
                <tr>
                  <td>Mercedes-Benz Classe A</td>
                  <td>2022</td>
                  <td>Sur commande</td>
                  <td><span className={styles.badgeSuccess}>En ligne</span></td>
                  <td>
                    <button className={styles.actionBtn}>Modifier</button>
                    <button className={`${styles.actionBtn} ${styles.danger}`}>Supprimer</button>
                  </td>
                </tr>
                <tr>
                  <td>Audi A3 Sportback</td>
                  <td>2023</td>
                  <td>Sur commande</td>
                  <td><span className={styles.badgeSuccess}>En ligne</span></td>
                  <td>
                    <button className={styles.actionBtn}>Modifier</button>
                    <button className={`${styles.actionBtn} ${styles.danger}`}>Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
