import { TestBed } from '@angular/core/testing';

import { KamraService } from './kamra.service';

describe('KamraService', () => {
  let service: KamraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KamraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
