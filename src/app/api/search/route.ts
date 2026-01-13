import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Server-side search with locale support
// Note: Chinese search uses English tokenizer as fallback (Orama limitation)
export const { GET } = createFromSource(source, {
  localeMap: {
    en: { language: 'english' },
    'zh-CN': { language: 'english' }, // Fallback: Orama doesn't fully support Chinese
    ja: { language: 'english' },
    ko: { language: 'english' },
    es: { language: 'spanish' },
    fr: { language: 'french' },
    de: { language: 'german' },
  },
});
