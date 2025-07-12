import { TestBed } from '@angular/core/testing';

import { DevicePlantService } from './device-plant.service';

describe('DevicePlantService', () => {
  let service: DevicePlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicePlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
