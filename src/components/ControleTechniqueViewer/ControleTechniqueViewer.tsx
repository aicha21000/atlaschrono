"use client";

import React, { useState, useEffect } from 'react';
import styles from './ControleTechniqueViewer.module.css';

interface ControleTechniqueViewerProps {
  fileUrl?: string;
  carTitle: string;
}

export default function ControleTechniqueViewer({ fileUrl, carTitle }: ControleTechniqueViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fermer la modale au clavier (Échap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!fileUrl) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.titleGroup}>
              <span className={styles.icon}>🛡️</span>
              <div>
                <h3 className={styles.title}>Contrôle Technique</h3>
                <p className={styles.subtitle}>Rapport officiel d&apos;expertise et de conformité</p>
              </div>
            </div>
            <span style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-secondary)'
            }}>
              Sur demande
            </span>
          </div>
          <div style={{ textAlign: 'center', padding: '0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            Rapport d&apos;inspection technique complet disponible en agence sur demande.
          </div>
        </div>
      </div>
    );
  }

  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className={styles.container}>
      {/* CARTE SHOWROOM AVEC EFFET ÉVENTAIL AU SURVOL */}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.icon}>🛡️</span>
            <div>
              <h3 className={styles.title}>Contrôle Technique Réglementaire</h3>
              <p className={styles.subtitle}>Procès-verbal de contrôle & conformité légale</p>
            </div>
          </div>
          <span className={styles.verifiedBadge}>
            ✅ Favorable (A)
          </span>
        </div>

        {/* CONTAINER EFFET ÉVENTAIL (3 CARTES EMPILÉES QUI S'ÉCARTENT) */}
        <div 
          className={styles.fanContainer} 
          onClick={() => setIsOpen(true)}
          title="Cliquez pour ouvrir le rapport"
        >
          {/* Page gauche de l'éventail */}
          <div className={`${styles.fanPage} ${styles.fanLeft}`}>
            <span style={{ fontSize: '1.15rem' }}>📋</span>
            <div className={styles.fanBadge} style={{ color: '#166534' }}>Procès-Verbal CT</div>
            <div className={styles.fanText}>Résultat : Favorable (A)</div>
          </div>

          {/* Page droite de l'éventail */}
          <div className={`${styles.fanPage} ${styles.fanRight}`}>
            <span style={{ fontSize: '1.15rem' }}>🔬</span>
            <div className={styles.fanBadge} style={{ color: '#1e40af' }}>Validité légale</div>
            <div className={styles.fanText}>Conforme à la circulation</div>
          </div>

          {/* Page centrale (Document principal) */}
          <div className={`${styles.fanPage} ${styles.fanCenter}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1rem' }}>🛡️</span>
              <strong style={{ fontSize: '0.75rem', color: 'var(--color-text-primary)' }}>
                {isPdf ? "PROCÈS-VERBAL AU FORMAT PDF" : "PROCÈS-VERBAL DE CONTRÔLE"}
              </strong>
            </div>
            {!isPdf ? (
              <img 
                src={fileUrl} 
                alt="Aperçu du rapport de contrôle technique" 
                className={styles.previewThumb}
              />
            ) : (
              <div style={{ 
                background: 'rgba(0, 85, 255, 0.08)', 
                width: '100%', 
                height: '65px', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column',
                marginTop: '0.25rem'
              }}>
                <span style={{ fontSize: '1.4rem' }}>📑</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                  CLIQUER POUR OUVRIR
                </span>
              </div>
            )}
          </div>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className={styles.actions}>
          <button 
            type="button"
            className={styles.viewBtn} 
            onClick={() => setIsOpen(true)}
          >
            <span>👁️</span> Consulter le rapport
          </button>
          <a 
            href={fileUrl} 
            download={`Controle-Technique-${carTitle.replace(/\s+/g, '-')}`}
            className={styles.downloadBtn}
          >
            <span>📥</span> Télécharger
          </a>
        </div>
      </div>

      {/* MODAL OVERLAY AFFICHÉE AU-DESSUS DE LA PAGE */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Header de la Modale */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                <div>
                  <h3>Contrôle Technique • {carTitle}</h3>
                  <span>Certificat officiel d&apos;inspection automobile conforme aux standards qualité</span>
                </div>
              </div>
              <div className={styles.modalActions}>
                <a 
                  href={fileUrl} 
                  download={`Controle-Technique-${carTitle.replace(/\s+/g, '-')}`}
                  className={styles.downloadBtn}
                  style={{ padding: '0.65rem 1rem' }}
                >
                  📥 Télécharger le PDF/Image
                </a>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.closeBtn}
                  aria-label="Fermer le rapport"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Corps du rapport au centre de l'overlay */}
            <div className={styles.modalBody}>
              {isPdf ? (
                <iframe 
                  src={`${fileUrl}#toolbar=1&view=FitH`} 
                  className={styles.pdfFrame}
                  title={`Contrôle Technique ${carTitle}`}
                />
              ) : (
                <img 
                  src={fileUrl} 
                  alt={`Contrôle Technique de ${carTitle}`} 
                  className={styles.imageViewer}
                />
              )}
            </div>

            {/* Bandeau inférieur du rapport CT réglementaire */}
            <div className={styles.modalFooter}>
              <div className={styles.checklistRow}>
                <span className={styles.checkItem}>📋 Procès-Verbal CT</span>
                <span className={styles.checkItem}>✅ Résultat : Favorable (A)</span>
                <span className={styles.checkItem}>🔍 Circulation autorisée</span>
                <span className={styles.checkItem}>🛡️ Conformité vérifiée</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                📋 Procès-verbal de contrôle technique réglementaire • Garantie Atlas Chrono Cars
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
