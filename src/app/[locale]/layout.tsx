import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`);

  return {
    title: t.home.title,
    description: "Monitor your Z.AI Coding Plan usage and quota",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
