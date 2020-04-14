import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardFetcherService } from './services/card-fetcher.service';
import { CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'innoware-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input()
  cardType: CardTypes;

  @Input()
  cardNumber: CardNumbers | Jokers;

  @Output()
  selected = new EventEmitter<null>();

  svg$: Observable<SafeHtml>;

  constructor(private cardFetcher: CardFetcherService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.svg$ = this.cardFetcher.fetch(this.cardType, this.cardNumber)
      .pipe(
        map(svg => this.domSanitizer.bypassSecurityTrustHtml(svg))
      );
  }

  checkChange({checked}: MatCheckboxChange) {
    if (checked) {
      this.selected.emit();
    }
  }
}
