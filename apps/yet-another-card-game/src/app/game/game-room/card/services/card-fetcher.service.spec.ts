import { TestBed } from '@angular/core/testing';

import { CardFetcherService } from './card-fetcher.service';

describe('CardFetcherService', () => {
  let service: CardFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
