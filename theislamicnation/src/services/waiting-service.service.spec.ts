import { TestBed } from '@angular/core/testing';

import { WaitingServiceService } from './waiting-service.service';

describe('WaitingServiceService', () => {
  let service: WaitingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
