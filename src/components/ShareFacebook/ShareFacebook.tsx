'use client';

import { useEffect, useState } from 'react';

interface ShareFacebookProps {
  label: string;
  pitch?: string;
}

export default function ShareFacebook({ label, pitch }: ShareFacebookProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const handleShare = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pitch) {
      navigator.clipboard.writeText(pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div>
      <a 
        href={shareUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleShare}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.2rem',
        background: '#1877F2',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        marginTop: '1rem',
        boxShadow: '0 4px 6px rgba(24, 119, 242, 0.2)'
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      {label}
    </a>
    {copied && (
      <span style={{ display: 'block', fontSize: '0.8rem', color: '#166534', marginTop: '0.5rem', fontWeight: 600 }}>
        ✅ Texte copié ! Vous pouvez le coller sur Facebook.
      </span>
    )}
    </div>
  );
}
