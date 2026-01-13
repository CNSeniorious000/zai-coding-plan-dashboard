import type { Metadata } from "next";
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import SearchDialog from '@/components/SearchDialog';

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    'zh-CN': {
      displayName: '简体中文',
      toc: '目录',
      search: '搜索文档',
      lastUpdate: '最后更新于',
      searchNoResult: '没有结果',
      previousPage: '上一页',
      nextPage: '下一页',
      chooseLanguage: '选择语言',
    },
    ja: {
      displayName: '日本語',
    },
    ko: {
      displayName: '한国어',
    },
    es: {
      displayName: 'Español',
    },
    fr: {
      displayName: 'Français',
    },
    de: {
      displayName: 'Deutsch',
    },
  },
});

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <RootProvider i18n={provider(locale)} search={{ SearchDialog }}>
        {children}
      </RootProvider>
    </NextIntlClientProvider>
  );
}
