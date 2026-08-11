"use client";

import styles from './AdminTable.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { updateCarStatus, deleteCar } from '@/actions/cars';

interface AdminTableProps {
  cars: any[];
  dict: any;
}

export default function AdminTable({ cars, dict }: AdminTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");
  const [loadingId, setLoadingId] = useState<string | null>(null);

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
                <td>
                  <div className={styles.carTitle}>{car.marque} {car.modele}</div>
                  <div className={styles.carSub}>{car.annee} • {car.energie} • {car.boite}</div>
                </td>
                <td>
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '1.05rem' }}>
                    {car.prix}{String(car.prix).toUpperCase().includes('DZD') ? '' : ' DZD'}
                  </strong>
                </td>
                <td>{Number(car.kilometrage).toLocaleString('fr-FR')} km</td>
                <td>
                  <strong style={{ color: 'var(--color-accent)' }}>
                    {car.views || 0}
                  </strong>
                </td>
                <td>
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
                <td>
                  <Link href={`/cars/${car.id}`} target="_blank" className={styles.actionBtn}>
                    Voir
                  </Link>
                  <Link href={`/admin/cars/${car.id}/edit`} className={styles.actionBtn}>
                    Modifier
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(car.id, `${car.marque} ${car.modele}`)}
                    className={`${styles.actionBtn} ${styles.danger}`}
                  >
                    Supprimer
                  </button>
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
    </div>
  );
}
