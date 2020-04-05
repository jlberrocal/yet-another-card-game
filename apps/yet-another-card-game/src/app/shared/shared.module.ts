import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateErrorPipe } from './pipes/translate-error.pipe';


@NgModule({
  declarations: [TranslateErrorPipe],
  exports: [
    TranslateErrorPipe
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ]
})
export class SharedModule {
}
