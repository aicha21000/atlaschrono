import { getDictionary } from '@/i18n/getLang';

export default async function PrivacyPage() {
  const dict = await getDictionary();

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>{dict.privacy.title}</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.privacy.law}</h2>
        <p>{dict.privacy.lawText}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.privacy.dataCollected}</h2>
        <p>{dict.privacy.dataText}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.privacy.rights}</h2>
        <p>{dict.privacy.rightsText}</p>
      </section>
    </div>
  );
}
