import { notFound } from 'next/navigation';
import { sendEmail } from '@/actions/send-email';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'en' | 'es' | 'pt' }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations('home');

  return (
    <>
      <form
        action={async () => {
          'use server';
          await sendEmail(locale);
        }}
      >
        <button type="submit">{t('submit')}</button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href="/en">
          {t('switch-to-en')}
        </a>
        <a href="/es">
          {t('switch-to-es')}
        </a>
        <a href="/pt">
          {t('switch-to-pt')}
        </a>
      </div>
    </>
  );
}
