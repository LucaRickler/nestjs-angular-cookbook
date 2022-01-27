import { TestBed } from '@angular/core/testing';

import { RecipeToIngredientService } from './recipe-to-ingredient.service';

describe('RecipeToIngredientService', () => {
  let service: RecipeToIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeToIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
