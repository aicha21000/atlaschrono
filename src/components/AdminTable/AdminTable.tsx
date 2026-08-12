"use client";

import styles from './AdminTable.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { updateCarStatus, deleteCar, updateCarPhotos } from '@/actions/cars';

interface AdminTableProps {
  cars: any[];
  dict: any;
}

export default function AdminTable({ cars, dict }: AdminTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [managingPhotosCar, setManagingPhotosCar] = useState<any | null>(null);
  const [tempImages, setTempImages] = useState<string[]>([]);

  const filteredCars = cars
    .filter(car => {
      const matchesSearch = `${car.marque} ${car.modele} ${car.annee}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter === "Tous" || car.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "views-desc") return (Number(b.views) || 0) - (Number(a.views) || 0);
      if (sortBy === "views-asc") return (Number(a.views) || 0) - (Number(b.views) || 0);
      if (sortBy === "price-desc") {
        const pA = Number(a.prix.toString().replace(/[^0-9]/g, '')) || 0;
        const pB = Number(b.prix.toString().replace(/[^0-9]/g, '')) || 0;
        return pB - pA;
      }
      if (sortBy === "price-asc") {
        const pA = Number(a.prix.toString().replace(/[^0-9]/g, '')) || 0;
        const pB = Number(b.prix.toString().replace(/[^0-9]/g, '')) || 0;
        return pA - pB;
      }
      return 0;
    });

  const handleStatusChange = async (carId: string, newStatus: string) => {
    setLoadingId(carId);
    await updateCarStatus(carId, newStatus);
    setLoadingId(null);
  };

  const handleDelete = async (carId: string, carName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le véhicule ${carName} ?`)) {
      await deleteCar(carId);
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "Réservé") return styles.statusReserved;
    if (status === "Vendu") return styles.statusSold;
    if (status === "En arrivage") return styles.statusArriving;
    return styles.statusOnline;
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flexGrow: 1 }}>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Rechercher par marque, modèle ou année..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Rechercher un véhicule"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.statusSelect}
            aria-label="Trier la liste des véhicules"
            style={{ padding: '0.65rem 1rem', borderRadius: '10px' }}
          >
            <option value="recent">📅 Plus récents (Par défaut)</option>
            <option value="views-desc">🔥 Plus populaires (Vues ↓)</option>
            <option value="views-asc">❄️ Moins populaires (Vues ↑)</option>
            <option value="price-desc">💰 Prix décroissant (↓)</option>
            <option value="price-asc">💰 Prix croissant (↑)</option>
          </select>
        </div>

        <div className={styles.filterTabs} role="group" aria-label="Filtrer par statut">
          {["Tous", "Disponible", "En arrivage", "Réservé", "Vendu"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`${styles.tab} ${statusFilter === status ? styles.active : ''}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Véhicule</th>
              <th>Prix affiché</th>
              <th>Kilométrage</th>
              <th>Vues</th>
              <th>{dict?.adminForm?.statusLabel || "Statut showroom"}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id}>
                <td data-label="Véhicule">
                  <div className={styles.carTitle}>{car.marque} {car.modele}</div>
                  <div className={styles.carSub}>{car.annee} • {car.energie} • {car.boite}</div>
                </td>
                <td data-label="Prix">
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem' }}>
                    {car.prix}{String(car.prix).toUpperCase().includes('DZD') ? '' : ' DZD'}
                  </strong>
                </td>
                <td data-label="Kilométrage">{Number(car.kilometrage).toLocaleString('fr-FR')} km</td>
                <td data-label="Vues">
                  <strong style={{ color: 'var(--color-accent)' }}>
                    {car.views || 0}
                  </strong>
                </td>
                <td data-label="Statut">
                  <select
                    aria-label={`Changer le statut de ${car.marque} ${car.modele}`}
                    value={car.status || "Disponible"}
                    disabled={loadingId === car.id}
                    onChange={(e) => handleStatusChange(car.id, e.target.value)}
                    className={`${styles.statusSelect} ${getStatusClass(car.status || "Disponible")}`}
                  >
                    <option value="Disponible">{dict?.adminForm?.statusAvailable || "🟢 Disponible"}</option>
                    <option value="En arrivage">{dict?.adminForm?.statusIncoming || "⏳ En arrivage"}</option>
                    <option value="Réservé">{dict?.adminForm?.statusReserved || "🟡 Réservé"}</option>
                    <option value="Vendu">{dict?.adminForm?.statusSold || "🔴 Vendu"}</option>
                  </select>
                </td>
                <td data-label="Actions">
                  <div className={styles.actionsContainer}>
                    <Link href={`/cars/${car.id}`} target="_blank" className={styles.actionBtn}>
                      Voir
                    </Link>
                    <Link href={`/admin/cars/${car.id}/edit`} className={styles.actionBtn}>
                      Modifier
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setManagingPhotosCar(car);
                        setTempImages(car.images || []);
                      }}
                      className={styles.actionBtn}
                      style={{ background: 'var(--color-bg-secondary)' }}
                    >
                      Photos
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(car.id, `${car.marque} ${car.modele}`)}
                      className={`${styles.actionBtn} ${styles.danger}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCars.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  Aucun véhicule ne correspond à votre recherche ou filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {managingPhotosCar && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'var(--color-bg-primary)', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Photos : {managingPhotosCar.marque} {managingPhotosCar.modele}</h2>
              <button onClick={() => setManagingPhotosCar(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-primary)' }}>✕</button>
            </div>
            
            {tempImages.length === 0 ? (
              <p>Aucune photo pour ce véhicule.</p>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {tempImages.map((url, index) => (
                  <div key={index} style={{ position: 'relative', width: '150px', height: '150px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Photo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0,0,0,0.6)', padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button type="button" onClick={() => {
                        if (index === 0) return;
                        const newImages = [...tempImages];
                        const temp = newImages[index - 1];
                        newImages[index - 1] = newImages[index];
                        newImages[index] = temp;
                        setTempImages(newImages);
                      }} disabled={index === 0} style={{ background: 'none', border: 'none', color: index === 0 ? 'gray' : 'white', cursor: index === 0 ? 'default' : 'pointer' }}>◀️</button>
                      <button type="button" onClick={() => {
                        setTempImages(prev => prev.filter((_, i) => i !== index));
                      }} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️</button>
                      <button type="button" onClick={() => {
                        if (index === tempImages.length - 1) return;
                        const newImages = [...tempImages];
                        const temp = newImages[index + 1];
                        newImages[index + 1] = newImages[index];
                        newImages[index] = temp;
                        setTempImages(newImages);
                      }} disabled={index === tempImages.length - 1} style={{ background: 'none', border: 'none', color: index === tempImages.length - 1 ? 'gray' : 'white', cursor: index === tempImages.length - 1 ? 'default' : 'pointer' }}>▶️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setManagingPhotosCar(null)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Annuler</button>
              <button onClick={async (e) => {
                const btn = e.currentTarget;
                btn.disabled = true;
                btn.innerText = 'Enregistrement...';
                await updateCarPhotos(managingPhotosCar.id, JSON.stringify(tempImages));
                setManagingPhotosCar(null);
              }} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--color-accent)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
