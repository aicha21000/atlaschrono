import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';
import AdminAuthGuard from '@/components/AdminAuthGuard/AdminAuthGuard';
import { formatPrice } from '@/lib/format';

export default async function AnalyticsPage() {
  const cars = await getCars();
  
  // 1. Calcul du total des vues dans tout le showroom
  const totalViews = cars.reduce((acc: number, car: any) => acc + (Number(car.views) || 0), 0);

  // 2. Classement complet du plus populaire au moins populaire
  const sortedCars = [...cars].sort((a: any, b: any) => {
    return (Number(b.views) || 0) - (Number(a.views) || 0);
  });

  const getRankBadgeClass = (index: number) => {
    if (index === 0) return `${styles.rankBadge} ${styles.gold}`;
    if (index === 1) return `${styles.rankBadge} ${styles.silver}`;
    if (index === 2) return `${styles.rankBadge} ${styles.bronze}`;
    return styles.rankBadge;
  };

  const getRankLabel = (index: number) => {
    if (index === 0) return "🥇 #1";
    if (index === 1) return "🥈 #2";
    if (index === 2) return "🥉 #3";
    return `#${index + 1}`;
  };

  return (
    <AdminAuthGuard>
      <div className={styles.container}>
        <div className="container">
          <header className={styles.header}>
            <Link href="/admin" className={styles.backLink}>← Retour au tableau de bord</Link>
            <h1 className={styles.title}>🏆 Classement de Popularité du Showroom</h1>
            <p className={styles.subtitle}>
              Classement complet des {cars.length} véhicules par volume de vues et intérêt clientèle (Total : {totalViews.toLocaleString('fr-FR')} vues).
            </p>
          </header>

          <div className={styles.leaderboardList}>
            {sortedCars.map((car: any, index: number) => {
              const carViews = Number(car.views) || 0;
              const percentage = totalViews > 0 ? Math.round((carViews / totalViews) * 100) : 0;

              return (
                <div key={car.id} className={`glass-panel ${styles.rankCard}`}>
                  <div className={getRankBadgeClass(index)}>
                    {getRankLabel(index)}
                  </div>

                  <div className={styles.carInfo}>
                    <h3>{car.marque} {car.modele}</h3>
                    <p>
                      {car.annee} • {car.energie} • {formatPrice(car.prix)} • <strong style={{ color: 'var(--color-text-primary)' }}>{car.status || "Disponible"}</strong>
                    </p>
                  </div>

                  <div className={styles.progressCol}>
                    <div className={styles.progressHeader}>
                      <span>Part des visites showroom</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.viewsCount}>
                    <strong>{carViews.toLocaleString('fr-FR')}</strong>
                    <span>Vues totales</span>
                  </div>

                  {car.recentVisitors && car.recentVisitors.length > 0 && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                      <details style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                        <summary style={{ fontWeight: 600, color: 'var(--color-text-secondary)', userSelect: 'none' }}>
                          👀 Historique des visites (IPs)
                        </summary>
                        <div style={{ marginTop: '0.75rem', maxHeight: '150px', overflowY: 'auto', background: 'var(--color-bg-secondary)', padding: '0.75rem', borderRadius: '8px' }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {car.recentVisitors.map((visit: { ip: string, date: string }, i: number) => (
                              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', borderBottom: i < car.recentVisitors.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                                <span style={{ fontFamily: 'monospace', color: 'var(--color-accent)' }}>{visit.ip}</span>
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                                  {new Date(visit.date).toLocaleString('fr-FR')}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </div>
                  )}

                  <div className={styles.actions}>
                    <Link href={`/cars/${car.id}`} target="_blank" className={styles.actionBtn}>
                      Voir fiche
                    </Link>
                    <Link href={`/admin/cars/${car.id}/edit`} className={styles.actionBtn}>
                      Modifier
                    </Link>
                  </div>
                </div>
              );
            })}

            {sortedCars.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>
                Aucun véhicule à afficher pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
