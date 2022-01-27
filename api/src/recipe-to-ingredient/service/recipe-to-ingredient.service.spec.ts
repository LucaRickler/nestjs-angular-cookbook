import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockIngredients } from '../../ingredients/models/ingredients.mock';
import { IngredientsService } from '../../ingredients/service/ingredients.service';
import { MockType } from '../../mock/mock-type';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockRecipes } from '../../recipe/models/recipe.mock';
import { RecipeService } from '../../recipe/service/recipe.service';
import { SubRecipeService } from '../../sub-recipe/service/sub-recipe.service';
import { MockUsers } from '../../users/models/users.mock';
import { RecipeToIngredient } from '../models/recipe-to-ingredient.entity';
import { MockRecipeToIngredients } from '../models/recipe-to-ingredient.mock';
import { RecipeToIngredientService } from './recipe-to-ingredient.service';

describe('RecipeToIngredientService', () => {
  let service: RecipeToIngredientService;
  let subRecipeService: MockType<SubRecipeService>;
  let ingredientService: MockType<IngredientsService>;
  let repositoryMock: MockType<Repository<RecipeToIngredient>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeToIngredientService,
        {
          provide: getRepositoryToken(RecipeToIngredient),
          useFactory: repositoryMockFactory,
        },
        {
          provide: SubRecipeService,
          useFactory: serviceMockFactory,
        },
        {
          provide: IngredientsService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    service = module.get<RecipeToIngredientService>(RecipeToIngredientService);
    repositoryMock = module.get(getRepositoryToken(RecipeToIngredient));
    subRecipeService = module.get(SubRecipeService);
    ingredientService = module.get(IngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all recipe-to-ingredients', async () => {
    repositoryMock.find.mockReturnValue(MockRecipeToIngredients);
    expect(await service.findAll(MockRecipeToIngredients[0].subRecipeId)).toStrictEqual(MockRecipeToIngredients);
  });

  it('should find an recipe-to-ingredient', async () => {
    repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
    expect(await service.findOne(MockRecipeToIngredients[0].subRecipeId, MockRecipeToIngredients[0].ingredientId)).toBe(MockRecipeToIngredients[0]);
  });

  it('should be able to create a recipe-to-ingredient', async () => {
    repositoryMock.save.mockReturnValue(MockRecipeToIngredients[0]);
    repositoryMock.findOne.mockReturnValue(undefined);
    subRecipeService.findOne.mockReturnValue(MockRecipes[0]);
    ingredientService.findOneByID.mockReturnValue(MockIngredients[0]);
    expect(await service.create(
      MockRecipeToIngredients[0].subRecipe.recipeId,
      MockRecipeToIngredients[0].subRecipeId,
      MockRecipeToIngredients[0],
      MockUsers[0]
    )).toStrictEqual(MockRecipeToIngredients[0]);
  });

  it('should not be able to create a duplicate recipe-to-ingredient', async () => {
    let error: any;
    try {
      repositoryMock.save.mockReturnValue(MockRecipeToIngredients[0]);
      repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
      subRecipeService.findOne.mockReturnValue(MockRecipes[0]);
      ingredientService.findOneByID.mockReturnValue(MockIngredients[0]);
      expect(await service.create(
      MockRecipeToIngredients[0].subRecipe.recipeId,
      MockRecipeToIngredients[0].subRecipeId,
        MockRecipeToIngredients[0],
        MockUsers[0]
      )).toStrictEqual(MockRecipeToIngredients[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should not be able to create a recipe-to-ingredient for non-existing recipe', async () => {
    let error: any;
    try {
      repositoryMock.save.mockReturnValue(MockRecipeToIngredients[0]);
      repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
      subRecipeService.findOne.mockReturnValue(undefined);
      ingredientService.findOneByID.mockReturnValue(MockIngredients[0]);
      expect(await service.create(
      MockRecipeToIngredients[0].subRecipe.recipeId,
      MockRecipeToIngredients[0].subRecipeId,
        MockRecipeToIngredients[0],
        MockUsers[0]
      )).toStrictEqual(MockRecipeToIngredients[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should not be able to create a recipe-to-ingredient for non-existing ingredient', async () => {
    let error: any;
    try {
      repositoryMock.save.mockReturnValue(MockRecipeToIngredients[0]);
      repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
      subRecipeService.findOne.mockReturnValue(MockRecipes[0]);
      ingredientService.findOneByID.mockReturnValue(undefined);
      expect(await service.create(
      MockRecipeToIngredients[0].subRecipe.recipeId,
      MockRecipeToIngredients[0].subRecipeId,
        MockRecipeToIngredients[0],
        MockUsers[0]
      )).toStrictEqual(MockRecipeToIngredients[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to update a recipe-to-ingredient', async () => {
    repositoryMock.save.mockReturnValue(MockRecipeToIngredients[0]);
    repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
    expect(await service.update(
      MockRecipeToIngredients[0].subRecipeId,
      MockRecipeToIngredients[0],
      MockUsers[0]
    )).toStrictEqual(MockRecipeToIngredients[0]);
  });

  it('should throw on update of not-existing recipe-to-ingredient', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(
        MockRecipeToIngredients[0].subRecipeId,
        MockRecipeToIngredients[0],
        MockUsers[0]
      );
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to delete an recipe-to-ingredient', async () => {
    expect(await service.delete(MockRecipeToIngredients[0].subRecipeId, MockRecipeToIngredients[0].ingredientId)).toBeTruthy();
  });

  it('should be able to update all recipe-to-ingredients', async () => {
    repositoryMock.findOne.mockReturnValue(MockRecipeToIngredients[0]);
    repositoryMock.find.mockReturnValue([MockRecipeToIngredients[0]]);
    subRecipeService.findOne.mockReturnValue(MockRecipes[0]);
    ingredientService.findOneByID.mockReturnValue(MockIngredients[0]);
    expect(await service.updateAll(
      MockRecipeToIngredients[0].subRecipe.recipeId,
      MockRecipeToIngredients[0].subRecipeId,
      [MockRecipeToIngredients[0]],
      MockUsers[0]
    )).toStrictEqual([MockRecipeToIngredients[0]]);
  });
});
