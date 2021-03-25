import { TestBed } from '@angular/core/testing';

import { KiskertmService } from './kiskertm.service';

describe('KiskertmService', () => {
  let service: KiskertmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiskertmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
