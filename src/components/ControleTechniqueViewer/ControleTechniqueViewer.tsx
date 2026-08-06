"use client";

import React, { useState, useEffect } from 'react';
import styles from './ControleTechniqueViewer.module.css';

interface ControleTechniqueViewerProps {
  fileUrl?: string;
  carTitle: string;
  dict: any;
}

export default function ControleTechniqueViewer({ fileUrl, carTitle, dict }: ControleTechniqueViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                <h3 className={styles.title}>{dict.ct.title}</h3>
                <p className={styles.subtitle}>{dict.ct.subtitle}</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            Rapport sur demande / التقرير عند الطلب
          </div>
        </div>
      </div>
    );
  }

  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.icon}>🛡️</span>
            <div>
              <h3 className={styles.title}>{dict.ct.title}</h3>
              <p className={styles.subtitle}>{dict.ct.subtitle}</p>
            </div>
          </div>
          <span className={styles.verifiedBadge}>
            {dict.ct.badgeFavorable}
          </span>
        </div>

        <div 
          className={styles.fanContainer} 
          onClick={() => setIsOpen(true)}
          title="Cliquez pour ouvrir le rapport"
        >
          <div className={`${styles.fanPage} ${styles.fanLeft}`}>
            <span style={{ fontSize: '1.15rem' }}>📋</span>
            <div className={styles.fanBadge} style={{ color: '#166534' }}>{dict.ct.fanLeftTitle}</div>
            <div className={styles.fanText}>{dict.ct.fanLeftDesc}</div>
          </div>

          <div className={`${styles.fanPage} ${styles.fanRight}`}>
            <span style={{ fontSize: '1.15rem' }}>🔬</span>
            <div className={styles.fanBadge} style={{ color: '#1e40af' }}>{dict.ct.fanRightTitle}</div>
            <div className={styles.fanText}>{dict.ct.fanRightDesc}</div>
          </div>

          <div className={`${styles.fanPage} ${styles.fanCenter}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1rem' }}>🛡️</span>
              <strong style={{ fontSize: '0.75rem', color: 'var(--color-text-primary)' }}>
                {isPdf ? dict.ct.pdfDoc : dict.ct.imgDoc}
              </strong>
            </div>
            {!isPdf ? (
              <img 
                src={fileUrl} 
                alt="Aperçu du rapport" 
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
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            type="button"
            className={styles.viewBtn} 
            onClick={() => setIsOpen(true)}
          >
            {dict.ct.btnView}
          </button>
          <a 
            href={fileUrl} 
            download={`Controle-Technique-${carTitle.replace(/\s+/g, '-')}`}
            className={styles.downloadBtn}
          >
            {dict.ct.btnDownload}
          </a>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                <div>
                  <h3>{dict.ct.title} • {carTitle}</h3>
                  <span>{dict.ct.subtitle}</span>
                </div>
              </div>
              <div className={styles.modalActions}>
                <a 
                  href={fileUrl} 
                  download={`Controle-Technique-${carTitle.replace(/\s+/g, '-')}`}
                  className={styles.downloadBtn}
                  style={{ padding: '0.65rem 1rem' }}
                >
                  {dict.ct.btnDownload}
                </a>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.closeBtn}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.modalBody}>
              {isPdf ? (
                <iframe 
                  src={`${fileUrl}#toolbar=1&view=FitH`} 
                  className={styles.pdfFrame}
                  title="PDF"
                />
              ) : (
                <img 
                  src={fileUrl} 
                  alt="Rapport" 
                  className={styles.imageViewer}
                />
              )}
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.checklistRow}>
                <span className={styles.checkItem}>{dict.ct.modalFooter1}</span>
                <span className={styles.checkItem}>{dict.ct.modalFooter2}</span>
                <span className={styles.checkItem}>{dict.ct.modalFooter3}</span>
                <span className={styles.checkItem}>{dict.ct.modalFooter4}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                {dict.ct.copyright}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
