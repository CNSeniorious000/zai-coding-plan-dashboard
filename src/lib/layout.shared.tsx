import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from './i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

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
      displayName: '한국어',
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

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n: provider(locale),
    nav: {
      title: 'Z.AI Usage Dashboard',
    },
    links: [
      {
        text: 'Dashboard',
        url: `/${locale}`,
      },
      {
        text: 'Docs',
        url: `/${locale}/docs`,
      },
    ],
  };
}
