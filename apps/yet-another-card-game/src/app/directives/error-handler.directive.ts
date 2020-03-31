import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatError } from '@angular/material/form-field';
import { TranslocoService } from '@ngneat/transloco';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[errorHandler]',
})
export class ErrorHandlerDirective implements OnInit, OnDestroy {
  @Input('errorHandler')
  form: FormGroup;

  @Input('errorHandlerKey')
  key: string;

  private hasView = false;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private transloco: TranslocoService) {
  }

  ngOnInit(): void {
    const control = this.form.get(this.key);
    if (control) {
      this.subscription = control.statusChanges
        .pipe(
          debounceTime(200),
          distinctUntilChanged()
        )
        .subscribe(() => {
          if (control.invalid && !this.hasView) {
            const errorKey = Object.keys(control.errors)[0];
            console.log('error', control.errors[errorKey]);
            this.viewContainer.createEmbeddedView(this.templateRef, {
              $implicit: this.transloco.translate(`validations.${errorKey}`, control.errors[errorKey])
            });
            this.hasView = true;
          } else if (!control.invalid && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
