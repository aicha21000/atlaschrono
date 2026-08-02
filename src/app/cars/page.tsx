import styles from './page.module.css';
import Link from 'next/link';
import { getCars } from '@/actions/cars';

export default async function CarsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const resolvedParams = await searchParams;
  let cars = await getCars();

  // Extraire les options uniques existantes dans la base de données
  const uniqueBrands = Array.from(new Set(cars.map((c: any) => c.marque).filter(Boolean)));
  const uniqueEnergies = Array.from(new Set(cars.map((c: any) => c.energie).filter(Boolean)));

  // Appliquer les filtres
  const selectedMarque = resolvedParams.marque;
  const selectedEnergie = resolvedParams.energie;

  if (selectedMarque && selectedMarque !== "Toutes") {
    cars = cars.filter((c: any) => c.marque === selectedMarque);
  }
  if (selectedEnergie && selectedEnergie !== "Toutes") {
    cars = cars.filter((c: any) => c.energie === selectedEnergie);
  }

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
            <form method="GET" action="/cars">
              <div className={styles.filterGroup}>
                <label>Marque</label>
                <select name="marque" className={styles.select} defaultValue={selectedMarque || "Toutes"}>
                  <option value="Toutes">Toutes les marques</option>
                  {uniqueBrands.map((brand: any) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Énergie</label>
                <select name="energie" className={styles.select} defaultValue={selectedEnergie || "Toutes"}>
                  <option value="Toutes">Toutes les énergies</option>
                  {uniqueEnergies.map((energie: any) => (
                    <option key={energie} value={energie}>{energie}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.applyBtn}>Appliquer les filtres</button>
            </form>
          </aside>
          
          <main className={styles.carGrid}>
            {cars.map((car: any) => (
              <div key={car.id} className={`glass-panel ${styles.carCard}`}>
                <div className={styles.carImagePlaceholder}>Image {car.marque}</div>
                <div className={styles.carInfo}>
                  <h3>{car.marque} {car.modele}</h3>
                  <p className={styles.carDetails}>{car.annee} • {car.kilometrage} km • {car.energie}</p>
                  <p className={styles.carPrice}>{car.prix}</p>
                  <Link href={`/cars/${car.id}`} className={styles.detailsBtn}>Voir détails</Link>
                </div>
              </div>
            ))}
            
            {cars.length === 0 && (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#a3a3a3'}}>
                Aucun véhicule ne correspond à ces critères.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
