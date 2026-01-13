import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

export const { GET } = createFromSource(source, {
  localeMap: {
    en: { language: 'english' },
    'zh-CN': {
      components: {
        tokenizer: createTokenizer(),
      },
    },
    ja: { language: 'english' }, // Japanese would need @orama/tokenizers/japanese
    ko: { language: 'english' },
    es: { language: 'spanish' },
    fr: { language: 'french' },
    de: { language: 'german' },
  },
});
