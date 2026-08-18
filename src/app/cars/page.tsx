import styles from './page.module.css';
import { getCars } from '@/actions/cars';
import CarsCatalogue from '@/components/CarsCatalogue/CarsCatalogue';
import { getDictionary, getLang } from '@/i18n/getLang';

export const dynamic = 'force-dynamic';

export default async function CarsPage() {
  const cars = await getCars();
  const dict = await getDictionary();
  const lang = await getLang();

  const uniqueBrands = Array.from(new Set(cars.map((c: any) => c.marque).filter(Boolean))) as string[];
  const uniqueEnergies = Array.from(new Set(cars.map((c: any) => c.energie).filter(Boolean))) as string[];

  return (
    <div className={styles.carsContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>{dict.cars.pageTitle}</h1>
          <p className={styles.subtitle}>{dict.cars.pageSubtitle}</p>
        </header>
        
        <CarsCatalogue 
          initialCars={cars} 
          uniqueBrands={uniqueBrands} 
          uniqueEnergies={uniqueEnergies} 
          dict={dict}
          lang={lang}
        />
      </div>
    </div>
  );
}
