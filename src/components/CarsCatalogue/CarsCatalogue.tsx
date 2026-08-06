"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/cars/page.module.css';

interface CarsCatalogueProps {
  initialCars: any[];
  uniqueBrands: string[];
  uniqueEnergies: string[];
  dict: any;
}

export default function CarsCatalogue({ initialCars, uniqueBrands, uniqueEnergies, dict }: CarsCatalogueProps) {
  const [marque, setMarque] = useState("Toutes");
  const [energie, setEnergie] = useState("Toutes");
  const [statut, setStatut] = useState("Tous");

  // Filtrage 100% côté client
  let filteredCars = initialCars;

  const translateEnergy = (energy: string) => {
    if (energy === "Essence") return dict.adminForm?.energyGasoline || energy;
    if (energy === "Diesel") return dict.adminForm?.energyDiesel || energy;
    if (energy === "Hybride") return dict.adminForm?.energyHybrid || energy;
    if (energy === "Électrique") return dict.adminForm?.energyElectric || energy;
    return energy;
  };
  
  
  if (marque !== "Toutes") {
    filteredCars = filteredCars.filter(c => c.marque === marque);
  }
  if (energie !== "Toutes") {
    filteredCars = filteredCars.filter(c => c.energie === energie);
  }
  if (statut !== "Tous") {
    filteredCars = filteredCars.filter(c => (c.status || "Disponible") === statut);
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.filters} aria-label="Filtres du catalogue">
        <h3>{dict.cars.filterTitle || "Filtres de recherche"}</h3>
        <div className={styles.filterGroup}>
          <label htmlFor="marque-select">{dict.cars.filterBrand || "Marque"}</label>
          <select 
            id="marque-select"
            className={styles.select} 
            value={marque} 
            onChange={(e) => setMarque(e.target.value)}
          >
            <option value="Toutes">{dict.cars.filterAll}</option>
            {uniqueBrands.map((brand: any) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="energie-select">{dict.home?.cardEnergy || "Énergie"}</label>
          <select 
            id="energie-select"
            className={styles.select} 
            value={energie} 
            onChange={(e) => setEnergie(e.target.value)}
          >
            <option value="Toutes">{dict.cars.filterAll}</option>
            {uniqueEnergies.map((en: any) => (
              <option key={en} value={en}>{translateEnergy(en)}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="statut-select">{dict.cars.filterAvailability || "Disponibilité"}</label>
          <select 
            id="statut-select"
            className={styles.select} 
            value={statut} 
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="Tous">{dict.cars.filterAll}</option>
            <option value="Disponible">{dict.cars.statusAvailable}</option>
            <option value="En arrivage">{dict.cars.statusIncoming}</option>
            <option value="Réservé">{dict.cars.statusReserved}</option>
            <option value="Vendu">{dict.cars.statusSold}</option>
          </select>
        </div>
        <button 
          className={styles.applyBtn} 
          onClick={() => {
            setMarque("Toutes");
            setEnergie("Toutes");
            setStatut("Tous");
          }}
          aria-label="Réinitialiser tous les filtres de recherche"
        >
          {dict.cars.filterReset || "Réinitialiser"}
        </button>
      </aside>
      
      <section aria-label="Liste des véhicules en stock" className={styles.carGrid}>
        {filteredCars.map((car: any) => {
          const status = car.status || "Disponible";
          const badgeText = status === "Réservé" ? dict.cars.statusReserved : status === "Vendu" ? dict.cars.statusSold : status === "En arrivage" ? dict.cars.statusIncoming : dict.cars.statusAvailable;
          const badgeStyle = status === "Réservé" 
            ? { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' } 
            : status === "Vendu" 
            ? { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } 
            : status === "En arrivage"
            ? { background: '#eff6ff', color: '#1e40af', border: '1px solid #93c5fd' }
            : { background: 'rgba(15, 23, 42, 0.85)', color: '#ffffff' };

          return (
          <article key={car.id} className={`glass-panel ${styles.carCard}`}>
            <div className={styles.carImagePlaceholder} style={{ position: 'relative' }}>
              <span 
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  zIndex: 2,
                  ...badgeStyle
                }}
              >
                {badgeText}
              </span>
              {car.images && car.images.length > 0 ? (
                <img 
                  src={car.images[0]} 
                  alt={`${car.marque} ${car.modele} (${car.annee})`} 
                  loading="lazy"
                  decoding="async"
                  style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%'}} 
                />
              ) : (
                <span>Image {car.marque}</span>
              )}
            </div>
            <div className={styles.carInfo}>
              <h3>{car.marque} {car.modele}</h3>
              <p className={styles.carDetails}>
                <span>{car.annee}</span> • <span>{Number(car.kilometrage).toLocaleString('fr-FR')} {dict.home.cardKm}</span> • <span>{translateEnergy(car.energie)}</span>
              </p>
              <p className={styles.carPrice}>{car.prix}</p>
              <Link 
                href={`/cars/${car.id}`} 
                className={styles.detailsBtn}
                aria-label={`Consulter la fiche technique du véhicule ${car.marque} ${car.modele}`}
              >
                {dict.home.cardCta}
              </Link>
            </div>
          </article>
          );
        })}
        
        {filteredCars.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)'}}>
            {dict.home.noCars}
          </div>
        )}
      </section>
    </div>
  );
}
