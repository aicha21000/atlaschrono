import styles from './page.module.css';
import { getSettings } from '@/actions/settings';

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className={styles.contactContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={`${styles.title} chrome-text`}>Contactez-Nous</h1>
          <p className={styles.subtitle}>Nous sommes à votre disposition pour toute demande d'importation ou d'information.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.infoSection}>
            <div className={`glass-panel ${styles.infoCard}`}>
              <h3>Nos Coordonnées</h3>
              <ul className={styles.infoList}>
                <li>
                  <span className={styles.icon}>📍</span>
                  <div>
                    <strong>Adresse</strong>
                    <p>{settings.address}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>📞</span>
                  <div>
                    <strong>Téléphone</strong>
                    <p>{settings.phone}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p>{settings.email}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>🕒</span>
                  <div>
                    <strong>Heures d'ouverture</strong>
                    <p>{settings.openingHours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.formSection}>
            <form className={`glass-panel ${styles.contactForm}`}>
              <h3>Envoyez-nous un message</h3>
              <div className={styles.inputGroup}>
                <label>Nom complet</label>
                <input type="text" placeholder="Votre nom" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Adresse Email</label>
                <input type="email" placeholder="votre@email.com" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Sujet</label>
                <select className={styles.select}>
                  <option>Demande d'information générale</option>
                  <option>Acheter un véhicule en stock</option>
                  <option>Demande d'importation spécifique</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Message</label>
                <textarea rows={6} placeholder="Comment pouvons-nous vous aider ?" className={styles.textarea} required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
