import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
  private component = new ComponentPortal(MatSpinner);

  constructor(private overlay: Overlay) {
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
  }

  showSpinner() {
    this.spinnerRef.attach(this.component);
  }

  hideSpinner() {
    this.spinnerRef.detach();
  }
}
