'use server';

import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome';
import { getTranslations } from 'next-intl/server';

export async function sendEmail(locale: 'pt' | 'en' | 'es') {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const t = await getTranslations('welcome-email');

  const response = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: t('header'),
    react: <WelcomeEmail name="John Lennon" locale={locale} />,
  });

  if (response.error) {
    throw new Error('Could not send email', {
      cause: response.error,
    });
  }

  console.info(response.data);
}
