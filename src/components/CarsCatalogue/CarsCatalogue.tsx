"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/cars/page.module.css';

interface CarsCatalogueProps {
  initialCars: any[];
  uniqueBrands: string[];
  uniqueEnergies: string[];
}

export default function CarsCatalogue({ initialCars, uniqueBrands, uniqueEnergies }: CarsCatalogueProps) {
  const [marque, setMarque] = useState("Toutes");
  const [energie, setEnergie] = useState("Toutes");

  // Filtrage 100% côté client
  let filteredCars = initialCars;
  
  if (marque !== "Toutes") {
    filteredCars = filteredCars.filter(c => c.marque === marque);
  }
  if (energie !== "Toutes") {
    filteredCars = filteredCars.filter(c => c.energie === energie);
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.filters}>
        <h3>Filtres</h3>
        <div className={styles.filterGroup}>
          <label>Marque</label>
          <select 
            className={styles.select} 
            value={marque} 
            onChange={(e) => setMarque(e.target.value)}
          >
            <option value="Toutes">Toutes les marques</option>
            {uniqueBrands.map((brand: any) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Énergie</label>
          <select 
            className={styles.select} 
            value={energie} 
            onChange={(e) => setEnergie(e.target.value)}
          >
            <option value="Toutes">Toutes les énergies</option>
            {uniqueEnergies.map((en: any) => (
              <option key={en} value={en}>{en}</option>
            ))}
          </select>
        </div>
        <button 
          className={styles.applyBtn} 
          onClick={() => {
            setMarque("Toutes");
            setEnergie("Toutes");
          }}
        >
          Réinitialiser
        </button>
      </aside>
      
      <main className={styles.carGrid}>
        {filteredCars.map((car: any) => (
          <div key={car.id} className={`glass-panel ${styles.carCard}`}>
            <div className={styles.carImagePlaceholder}>
              {car.images && car.images.length > 0 ? (
                <img src={car.images[0]} alt={`${car.marque} ${car.modele}`} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                <span>Image {car.marque}</span>
              )}
            </div>
            <div className={styles.carInfo}>
              <h3>{car.marque} {car.modele}</h3>
              <p className={styles.carDetails}>{car.annee} • {car.kilometrage} km • {car.energie}</p>
              <p className={styles.carPrice}>{car.prix}</p>
              <Link href={`/cars/${car.id}`} className={styles.detailsBtn}>Voir détails</Link>
            </div>
          </div>
        ))}
        
        {filteredCars.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#a3a3a3'}}>
            Aucun véhicule ne correspond à ces critères.
          </div>
        )}
      </main>
    </div>
  );
}
