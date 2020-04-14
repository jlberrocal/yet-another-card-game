import {
  AfterViewInit,
  ContentChild,
  Directive, ElementRef,
  EmbeddedViewRef,
  OnDestroy,
  OnInit, Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormControlName, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[errorHandler]'
})
export class ErrorHandlerDirective implements OnInit, AfterViewInit, OnDestroy {
  @ContentChild(NgControl)
  control: NgControl;

  private hasView = false;
  private subscription: Subscription;

  private readonly view: EmbeddedViewRef<any>;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private transloco: TranslocoService) {
  }

  ngOnInit(): void {

    /*const control = this.form.get(this.key);
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
    }*/
  }

  ngAfterViewInit(): void {
    const errorNode = this.renderer.createElement('mat-error');
    const content = this.renderer.createText(this.transloco.translate('validations.required'));
    this.renderer.appendChild(errorNode, content);
    this.renderer.appendChild(this.elementRef.nativeElement.querySelector('.mat-form-field-subscript-wrapper'), errorNode);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
