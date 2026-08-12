import { getDictionary } from '@/i18n/getLang';

export default async function TermsPage() {
  const dict = await getDictionary();

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>{dict.terms.title}</h1>
      
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>{dict.terms.intro}</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.terms.sales}</h2>
        <p>{dict.terms.salesText}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.terms.import}</h2>
        <p>{dict.terms.importText}</p>
      </section>
    </div>
  );
}
