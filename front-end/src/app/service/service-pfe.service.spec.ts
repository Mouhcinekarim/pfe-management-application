import { TestBed } from '@angular/core/testing';

import { ServicePfeService } from './service-pfe.service';

describe('ServicePfeService', () => {
  let service: ServicePfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
