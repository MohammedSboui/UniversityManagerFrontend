import { TestBed } from '@angular/core/testing';

import { UniversitesService } from './universites.service';

describe('UniversitesService', () => {
  let service: UniversitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
