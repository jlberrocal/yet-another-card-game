import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { TranslocoHttpLoader } from './transloco-http-loader';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
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
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {
}
