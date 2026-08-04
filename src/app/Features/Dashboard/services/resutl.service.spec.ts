import { TestBed } from '@angular/core/testing';

import { ResutlService } from './resutl.service';

describe('ResutlService', () => {
  let service: ResutlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResutlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
