import styles from './page.module.css';
import { getCars } from '@/actions/cars';
import CarsCatalogue from '@/components/CarsCatalogue/CarsCatalogue';

export const dynamic = 'force-dynamic';

export default async function CarsPage() {
  const cars = await getCars();

  const uniqueBrands = Array.from(new Set(cars.map((c: any) => c.marque).filter(Boolean))) as string[];
  const uniqueEnergies = Array.from(new Set(cars.map((c: any) => c.energie).filter(Boolean))) as string[];

  return (
    <div className={styles.carsContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Notre Catalogue de Véhicules</h1>
          <p className={styles.subtitle}>Filtrez et trouvez le véhicule d'occasion idéal, fraîchement importé.</p>
        </header>
        
        <CarsCatalogue 
          initialCars={cars} 
          uniqueBrands={uniqueBrands} 
          uniqueEnergies={uniqueEnergies} 
        />
      </div>
    </div>
  );
}
