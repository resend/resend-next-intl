import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { createTranslator } from 'next-intl';

interface WelcomeEmailProps {
  locale: 'en' | 'es' | 'pt';
  name: string;
}

export default async function WelcomeEmail({ locale, name }: WelcomeEmailProps) {
  const t = createTranslator({
    messages: await import(`../messages/${locale}.json`),
    namespace: 'welcome-email',
    locale,
  });

  return (
    <Html>
      <Head />
      <Preview>{t('header')}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-10 px-5">
            <Section className="bg-white rounded-lg p-8">
              <Heading className="text-2xl font-bold text-gray-900 m-0 mb-6">
                {t('header')}
              </Heading>
              <Text className="text-base leading-6 text-gray-600 m-0 mb-4">
                {t('hi')} {name}
              </Text>
              <Text className="text-base leading-6 text-gray-600 m-0 mb-4">
                {t('thanks')}
              </Text>
              <Button
                href="https://example.com/dashboard"
                className="bg-indigo-600 rounded-md text-white text-base font-semibold no-underline text-center block py-3 px-6 my-6"
              >
                {t('get-started')}
              </Button>
              <Hr className="border-gray-200 my-6" />
              <Text className="text-sm text-gray-400 m-0">
                {t('questions')}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  locale: 'en',
  name: 'John Lennon',
};
