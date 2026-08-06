"use client";

import { useState } from "react";
import styles from "@/app/contact/page.module.css";
import { sendContactEmail } from "@/actions/contact";

export default function ContactForm({ dict }: { dict: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus({ type: "success", message: dict.contact.successMessage || "Votre message a été envoyé avec succès !" });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus({ type: "error", message: result.error || "Une erreur est survenue." });
    }

    setIsSubmitting(false);
  };

  return (
    <form className={`glass-panel ${styles.contactForm}`} onSubmit={handleSubmit}>
      <h3>{dict.contact.formTitle}</h3>
      
      {status.type && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: status.type === 'success' ? '#166534' : '#991b1b',
          border: `1px solid ${status.type === 'success' ? '#86efac' : '#fca5a5'}`
        }}>
          {status.message}
        </div>
      )}

      <div className={styles.inputGroup}>
        <label>{dict.contact.name}</label>
        <input type="text" name="name" placeholder={dict.contact.namePlaceholder} className={styles.input} required />
      </div>
      <div className={styles.inputGroup}>
        <label>{dict.contact.email}</label>
        <input type="email" name="email" placeholder={dict.contact.emailPlaceholder} className={styles.input} required />
      </div>
      <div className={styles.inputGroup}>
        <label>{dict.contact.subject}</label>
        <select name="subject" className={styles.select}>
          <option value={dict.contact.subject1}>{dict.contact.subject1}</option>
          <option value={dict.contact.subject2}>{dict.contact.subject2}</option>
          <option value={dict.contact.subject3}>{dict.contact.subject3}</option>
          <option value={dict.contact.subject4}>{dict.contact.subject4}</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label>{dict.contact.message}</label>
        <textarea name="message" rows={6} placeholder={dict.contact.messagePlaceholder} className={styles.textarea} required></textarea>
      </div>
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? "..." : dict.contact.submit}
      </button>
    </form>
  );
}
