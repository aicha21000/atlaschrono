"use client";

import styles from './AdminTable.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { updateCarStatus, deleteCar } from '@/actions/cars';

interface AdminTableProps {
  cars: any[];
}

export default function AdminTable({ cars }: AdminTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredCars = cars.filter(car => {
    const matchesSearch = `${car.marque} ${car.modele} ${car.annee}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Tous" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
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
    return styles.statusOnline;
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
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

        <div className={styles.filterTabs} role="group" aria-label="Filtrer par statut">
          {["Tous", "En ligne", "Réservé", "Vendu"].map((status) => (
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
              <th>Statut showroom</th>
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
                    {car.prix}
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
                    value={car.status || "En ligne"}
                    disabled={loadingId === car.id}
                    onChange={(e) => handleStatusChange(car.id, e.target.value)}
                    className={`${styles.statusSelect} ${getStatusClass(car.status || "En ligne")}`}
                  >
                    <option value="En ligne">🟢 En ligne</option>
                    <option value="Réservé">🟡 Réservé</option>
                    <option value="Vendu">🔴 Vendu</option>
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
