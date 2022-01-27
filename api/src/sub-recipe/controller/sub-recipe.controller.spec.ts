import { Test, TestingModule } from '@nestjs/testing';
import { SubRecipeController } from './sub-recipe.controller';
import { SubRecipeService } from '../service/sub-recipe.service';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockType } from '../../mock/mock-type';
import { MockSubRecipe } from '../models/sub-recipe.mock';
import { MockUsers } from '../../users/models/users.mock';

describe('SubRecipeController', () => {
  let controller: SubRecipeController;
  let service: MockType<SubRecipeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubRecipeController],
      providers: [{
        provide: SubRecipeService,
        useFactory: serviceMockFactory,
      }],
    }).compile();

    controller = module.get<SubRecipeController>(SubRecipeController);
    service = module.get(SubRecipeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all recipe-to-ingredients', async () => {
    service.findAll.mockReturnValue(MockSubRecipe);
    expect(await controller.findAll(MockSubRecipe[0].recipeId.toString())).toStrictEqual(MockSubRecipe);
  });

  it('should get a recipe-to-ingredient', async () => {
    service.findOne.mockReturnValue(MockSubRecipe[0]);
    expect(await controller.findOne(
      MockSubRecipe[0].recipeId.toString(),
      MockSubRecipe[0].id.toString(),
    )).toStrictEqual(MockSubRecipe[0]);
  });

  it('should be able to create a recipe-to-ingredient', async () => {
    service.create.mockReturnValue(MockSubRecipe[0]);
    expect(await controller.create(
      MockSubRecipe[0].recipeId.toString(),
      MockSubRecipe[0],
      MockUsers[0]
    )).toStrictEqual(MockSubRecipe[0]);
  });

  it('should be able to update a recipe-to-ingredient', async () => {
    service.update.mockReturnValue(MockSubRecipe[0]);
    expect(await controller.update(
      MockSubRecipe[0].recipeId.toString(),
      MockSubRecipe[0].id.toString(),
      MockSubRecipe[0],
      MockUsers[0]
    )).toStrictEqual(MockSubRecipe[0]);
  });

  it('shold be able to delete a recipe-to-ingredient', async () => {
    expect(await controller.remove(
      MockSubRecipe[0].recipeId.toString(),
      MockSubRecipe[0].id.toString(),
      )).toBeDefined();
  });

});
