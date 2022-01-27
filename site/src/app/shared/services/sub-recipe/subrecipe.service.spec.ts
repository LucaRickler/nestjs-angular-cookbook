import { TestBed } from '@angular/core/testing';

import { SubrecipeService } from './subrecipe.service';

describe('SubrecipeService', () => {
  let service: SubrecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubrecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
