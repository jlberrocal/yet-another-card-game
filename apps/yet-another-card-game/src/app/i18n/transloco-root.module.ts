import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-http-loader';
import { translationConfig } from './transloco.config';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translationConfig
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader
    }
  ]
})
export class TranslocoRootModule {
}
