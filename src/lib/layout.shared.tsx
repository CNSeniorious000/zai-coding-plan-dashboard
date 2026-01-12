import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Z.AI Usage Dashboard',
    },
    links: [
      {
        text: 'Dashboard',
        url: '/',
      },
      {
        text: 'Docs',
        url: '/docs',
      },
    ],
  };
}
