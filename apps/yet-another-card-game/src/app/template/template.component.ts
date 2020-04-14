import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { NativeElement } from '../utils/native-element.decorator';

@Component({
  selector: 'innoware-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent {

  @ViewChild(MatToolbar, { read: ElementRef })
  @NativeElement(HTMLElement)
  set toolbarRef({ offsetHeight }: HTMLElement) {
    // allows bodyHeight to grow as much as possible
    // 100vh full vertical viewport height
    // Toolbar height
    this.bodyHeight = `calc(100vh - (${offsetHeight}px))`;
    this.cdr.detectChanges();
  }

  bodyHeight: string;

  constructor(private cdr: ChangeDetectorRef) {
  }

}
