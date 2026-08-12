import { getDictionary } from '@/i18n/getLang';
import { getSettings } from '@/actions/settings';

export default async function LegalPage() {
  const dict = await getDictionary();
  const settings = await getSettings();

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>{dict.legal.title}</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.legal.companyName}</h2>
        <p><strong>Société :</strong> {settings.companyName}</p>
        <p><strong>Email :</strong> {settings.email}</p>
        <p><strong>Téléphone :</strong> {settings.phone}</p>
        <p><strong>Adresse :</strong> {settings.address}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.legal.hosting}</h2>
        <p>{dict.legal.hostingText}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{dict.legal.ipProp}</h2>
        <p>{dict.legal.ipText}</p>
      </section>
    </div>
  );
}
