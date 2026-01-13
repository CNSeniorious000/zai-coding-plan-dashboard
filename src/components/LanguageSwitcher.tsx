'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

const localeNames: Record<string, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export function LanguageSwitcher({ align = 'start' }: { align?: 'start' | 'end' } = {}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocaleName = localeNames[locale] || locale;

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='rounded-full h-8 px-3 text-xs gap-1.5'>
          <Languages className='w-3.5 h-3.5' />
          <span className='hidden sm:inline'>{currentLocaleName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className='min-w-[160px]'>
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleChangeLocale(loc)}
            disabled={loc === locale}
            className='text-xs'
          >
            {localeNames[loc] || loc}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
