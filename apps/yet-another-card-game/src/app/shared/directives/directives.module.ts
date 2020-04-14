import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerDirective } from './error-handler.directive';
import { NumericDirective } from './numeric.directive';

@NgModule({
  declarations: [ErrorHandlerDirective, NumericDirective],
  imports: [
    CommonModule
  ],
  exports: [ErrorHandlerDirective, NumericDirective]
})
export class DirectivesModule { }
