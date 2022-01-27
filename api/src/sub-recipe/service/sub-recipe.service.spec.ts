import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../mock/mock-type';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockRecipes } from '../../recipe/models/recipe.mock';
import { RecipeService } from '../../recipe/service/recipe.service';
import { MockUsers } from '../../users/models/users.mock';
import { SubRecipe } from '../models/sub-recipe.entity';
import { MockSubRecipe } from '../models/sub-recipe.mock';
import { SubRecipeService } from './sub-recipe.service';

describe('SubRecipeService', () => {
  let service: SubRecipeService;
  let recipeService: MockType<RecipeService>;
  let repositoryMock: MockType<Repository<SubRecipe>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubRecipeService,
        {
          provide: getRepositoryToken(SubRecipe),
          useFactory: repositoryMockFactory,
        },
        {
          provide: RecipeService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    service = module.get<SubRecipeService>(SubRecipeService);
    repositoryMock = module.get(getRepositoryToken(SubRecipe));
    recipeService = module.get(RecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all recipe-to-ingredients', async () => {
    repositoryMock.find.mockReturnValue(MockSubRecipe);
    expect(await service.findAll(MockSubRecipe[0].recipeId)).toStrictEqual(MockSubRecipe);
  });

  it('should find an sub-recipe', async () => {
    repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
    expect(await service.findOne(MockSubRecipe[0].recipeId, MockSubRecipe[0].id)).toBe(MockSubRecipe[0]);
  });

  it('should be able to create a sub-recipe', async () => {
    repositoryMock.save.mockReturnValue(MockSubRecipe[0]);
    repositoryMock.findOne.mockReturnValue(undefined);
    recipeService.findOne.mockReturnValue(MockRecipes[0]);
  });

  // it('should not be able to create a duplicate sub-recipe', async () => {
  //   let error: any;
  //   try {
  //     repositoryMock.save.mockReturnValue(MockSubRecipe[0]);
  //     repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
  //     recipeService.findOne.mockReturnValue(MockRecipes[0]);
  //   } catch (err) {
  //     error = err;
  //   }
  //   expect(error).toBeDefined();
  // });

  it('should not be able to create a sub-recipe for non-existing recipe', async () => {
    let error: any;
    try {
      repositoryMock.save.mockReturnValue(MockSubRecipe[0]);
      repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
      recipeService.findOne.mockReturnValue(undefined);
      await service.create(
        MockSubRecipe[0].recipeId,
        MockSubRecipe[0],
        MockUsers[0]
      )
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  // it('should not be able to create a sub-recipe for non-existing ingredient', async () => {
  //   let error: any;
  //   try {
  //     repositoryMock.save.mockReturnValue(MockSubRecipe[0]);
  //     repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
  //     recipeService.findOne.mockReturnValue(MockRecipes[0]);
  //     await service.create(
  //       MockSubRecipe[0].recipeId,
  //       MockSubRecipe[0],
  //       MockUsers[0]
  //     )
  //   } catch (err) {
  //     error = err;
  //   }
  //   expect(error).toBeDefined();
  // });

  it('should be able to update a sub-recipe', async () => {
    repositoryMock.save.mockReturnValue(MockSubRecipe[0]);
    repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
    expect(await service.update(
      MockSubRecipe[0].recipeId,
      MockSubRecipe[0].id,
      MockSubRecipe[0],
      MockUsers[0]
    )).toStrictEqual(MockSubRecipe[0]);
  });

  it('should throw on update of not-existing sub-recipe', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(
        MockSubRecipe[0].recipeId,
      MockSubRecipe[0].id,
      MockSubRecipe[0],
        MockUsers[0]
      );
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to delete an sub-recipe', async () => {
    expect(await service.delete(MockSubRecipe[0].recipeId, MockSubRecipe[0].id)).toBeTruthy();
  });

  // it('should be able to update all recipe-to-ingredients', async () => {
  //   repositoryMock.findOne.mockReturnValue(MockSubRecipe[0]);
  //   repositoryMock.find.mockReturnValue([MockSubRecipe[0]]);
  //   recipeService.findOne.mockReturnValue(MockRecipes[0]);
  //   recipeToIngredientService.findOne.mockReturnValue(MockRecipeToIngredients[0]);
  //   expect(await service.updateAll(
  //     MockSubRecipe[0].recipeId,
  //     [MockSubRecipe[0]],
  //     MockUsers[0]
  //   )).toStrictEqual([MockSubRecipe[0]]);
  // });
});
