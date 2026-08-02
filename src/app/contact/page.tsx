import styles from './page.module.css';

export default function ContactPage() {
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
                    <p>Alger Centre, Algérie<br/>(Adresse exacte à définir)</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>📞</span>
                  <div>
                    <strong>Téléphone</strong>
                    <p>+213 XX XX XX XX</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p>contact@premiumautodz.com</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>🕒</span>
                  <div>
                    <strong>Heures d'ouverture</strong>
                    <p>Dimanche - Jeudi : 09h00 - 18h00<br/>Samedi : 10h00 - 16h00</p>
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
