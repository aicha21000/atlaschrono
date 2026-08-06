import styles from './page.module.css';
import { getSettings } from '@/actions/settings';
import { getDictionary } from '@/i18n/getLang';
import ContactForm from '@/components/ContactForm/ContactForm';

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
            <ContactForm dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
