import { getDictionary } from '@/i18n/getLang';

export default async function CharterPage() {
  const dict = await getDictionary();

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>{dict.charter.title}</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>🔍</span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', margin: 0 }}>{dict.charter.transparency}</h2>
        </div>
        <p>{dict.charter.transparencyText}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>🛡️</span>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', margin: 0 }}>{dict.charter.payment}</h2>
        </div>
        <p>{dict.charter.paymentText}</p>
      </section>
    </div>
  );
}
