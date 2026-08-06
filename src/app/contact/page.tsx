import styles from './page.module.css';
import { getSettings } from '@/actions/settings';
import { getDictionary } from '@/i18n/getLang';

export default async function ContactPage() {
  const settings = await getSettings();
  const dict = await getDictionary();

  return (
    <div className={styles.contactContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={`${styles.title} chrome-text`}>{dict.contact.title}</h1>
          <p className={styles.subtitle}>{dict.contact.subtitle}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.infoSection}>
            <div className={`glass-panel ${styles.infoCard}`}>
              <h3>{dict.contact.infoTitle}</h3>
              <ul className={styles.infoList}>
                <li>
                  <span className={styles.icon}>📍</span>
                  <div>
                    <strong>{dict.contact.address}</strong>
                    <p>{settings.address}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>📞</span>
                  <div>
                    <strong>{dict.contact.phone}</strong>
                    <p>{settings.phone}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>✉️</span>
                  <div>
                    <strong>{dict.contact.email}</strong>
                    <p>{settings.email}</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>🕒</span>
                  <div>
                    <strong>{dict.contact.hours}</strong>
                    <p>{settings.openingHours === "Samedi - Jeudi : 09h00 - 19h00" ? (dict.contact.hoursValue || settings.openingHours) : settings.openingHours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.formSection}>
            <form className={`glass-panel ${styles.contactForm}`}>
              <h3>{dict.contact.formTitle}</h3>
              <div className={styles.inputGroup}>
                <label>{dict.contact.name}</label>
                <input type="text" placeholder={dict.contact.namePlaceholder} className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.contact.email}</label>
                <input type="email" placeholder={dict.contact.emailPlaceholder} className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.contact.subject}</label>
                <select className={styles.select}>
                  <option>{dict.contact.subject1}</option>
                  <option>{dict.contact.subject2}</option>
                  <option>{dict.contact.subject3}</option>
                  <option>{dict.contact.subject4}</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>{dict.contact.message}</label>
                <textarea rows={6} placeholder={dict.contact.messagePlaceholder} className={styles.textarea} required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>{dict.contact.submit}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
