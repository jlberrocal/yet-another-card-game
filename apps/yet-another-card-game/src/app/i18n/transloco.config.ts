import { environment } from '../../environments/environment';
import { translocoConfig } from '@ngneat/transloco';

export const translationConfig = translocoConfig({
  availableLangs: ['en', 'es'],
  defaultLang: 'es',
  fallbackLang: 'en',
  prodMode: environment.production,
  missingHandler: {
    logMissingKey: true,
    useFallbackTranslation: true
  },
  flatten: {
    aot: environment.production
  }
});
