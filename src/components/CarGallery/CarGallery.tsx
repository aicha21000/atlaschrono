"use client";
import { useState, useEffect } from 'react';
import styles from './CarGallery.module.css';

interface CarGalleryProps {
  images: string[] | undefined;
  altText: string;
}

export default function CarGallery({ images, altText }: CarGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fallback si pas d'image
  if (!images || images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <span>Aucune image</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && images.length > 1) {
      intervalId = setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, images.length]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? images!.length - 1 : current - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % images!.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {images.length > 1 && (
          <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={handlePrev} aria-label="Image précédente">
            ❮
          </button>
        )}
        
        <img 
          src={images[activeIndex]} 
          alt={`${altText} - Vue ${activeIndex + 1}`} 
        />
        
        {images.length > 1 && (
          <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={handleNext} aria-label="Image suivante">
            ❯
          </button>
        )}
      </div>
      
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`${styles.thumb} ${activeIndex === idx ? styles.activeThumb : ''}`}
              onClick={() => handleThumbnailClick(idx)}
            >
              <img src={img} alt={`Miniature ${idx}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
