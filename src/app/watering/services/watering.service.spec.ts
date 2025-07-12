import { TestBed } from '@angular/core/testing';

import { WateringService } from './watering.service';

describe('WateringService', () => {
  let service: WateringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WateringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
