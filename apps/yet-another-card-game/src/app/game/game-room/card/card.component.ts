import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CardFetcherService } from './services/card-fetcher.service';
import { CardNumbers, CardTypes } from '@innoware/api-interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'innoware-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [CardFetcherService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input()
  cardType: CardTypes;

  @Input()
  cardNumber: CardNumbers;

  svg$: Observable<SafeHtml>;

  constructor(private cardFetcher: CardFetcherService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.svg$ = this.cardFetcher.fetch(this.cardType, this.cardNumber)
      .pipe(
        map(svg => this.domSanitizer.bypassSecurityTrustHtml(svg))
      );
  }

}
