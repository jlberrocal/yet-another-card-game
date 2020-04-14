import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateErrorPipe } from './pipes/translate-error.pipe';
import { DirectivesModule } from './directives/directives.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { A11yModule } from '@angular/cdk/a11y';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [TranslateErrorPipe, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    DirectivesModule,
    MatDialogModule,
    MatButtonModule,
    LayoutModule,
    A11yModule,
    FlexModule
  ],
  exports: [
    TranslateErrorPipe,
    DirectivesModule
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {
}
