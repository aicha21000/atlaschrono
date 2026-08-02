import styles from './page.module.css';
import Link from 'next/link';

export default function NewCar() {
  return (
    <div className={styles.newCarContainer}>
      <div className="container">
        <header className={styles.header}>
          <Link href="/admin" className={styles.backBtn}>&larr; Retour au tableau de bord</Link>
          <h1 className={styles.title}>Ajouter un nouveau véhicule</h1>
        </header>

        <form className={`glass-panel ${styles.form}`}>
          <div className={styles.formSection}>
            <h2>Informations Générales</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Marque</label>
                <input type="text" placeholder="ex: Mercedes-Benz" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Modèle</label>
                <input type="text" placeholder="ex: Classe A" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Année Modèle (Max 3 ans)</label>
                <input type="number" placeholder="ex: 2022" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Prix (DZD / EUR)</label>
                <input type="text" placeholder="ex: Sur commande" className={styles.input} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Caractéristiques Techniques</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Kilométrage</label>
                <input type="number" placeholder="ex: 25000" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Énergie</label>
                <select className={styles.select}>
                  <option>Essence</option>
                  <option>Diesel</option>
                  <option>Hybride</option>
                  <option>Électrique</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Boîte de Vitesse</label>
                <select className={styles.select}>
                  <option>Automatique</option>
                  <option>Manuelle</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Couleur</label>
                <input type="text" placeholder="ex: Noir Obsidienne" className={styles.input} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Médias & Description</h2>
            <div className={styles.inputGroup}>
              <label>Description Détaillée</label>
              <textarea rows={5} placeholder="Décrivez les options, l'état du véhicule..." className={styles.textarea}></textarea>
            </div>
            <div className={styles.inputGroup}>
              <label>Photos du véhicule</label>
              <div className={styles.uploadArea}>
                Cliquez pour ajouter des images ou glissez-les ici
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/admin" className={styles.cancelBtn}>Annuler</Link>
            <button type="submit" className={styles.submitBtn}>Publier l'annonce</button>
          </div>
        </form>
      </div>
    </div>
  );
}
