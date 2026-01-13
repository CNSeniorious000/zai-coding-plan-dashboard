import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from './i18n';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: 'Z.AI Usage Dashboard',
    },
    links: [
      {
        text: 'Dashboard',
        url: `/${locale}`,
        active: 'url',
      },
      {
        text: 'Docs',
        url: `/${locale}/docs`,
        active: 'none',
      },
    ],
  };
}
