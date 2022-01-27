import { Test, TestingModule } from '@nestjs/testing';
import { RecipeToIngredientController } from './recipe-to-ingredient.controller';
import { RecipeToIngredientService } from '../service/recipe-to-ingredient.service';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockType } from '../../mock/mock-type';
import { MockRecipeToIngredients } from '../models/recipe-to-ingredient.mock';
import { MockUsers } from '../../users/models/users.mock';

describe('RecipeToIngredientController', () => {
  let controller: RecipeToIngredientController;
  let service: MockType<RecipeToIngredientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeToIngredientController],
      providers: [
        {
          provide: RecipeToIngredientService,
          useFactory: serviceMockFactory,
        }
      ],
    }).compile();

    controller = module.get<RecipeToIngredientController>(RecipeToIngredientController);
    service = module.get(RecipeToIngredientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all recipe-to-ingredients', async () => {
    service.findAll.mockReturnValue(MockRecipeToIngredients);
    expect(await controller.findAll(MockRecipeToIngredients[0].subRecipeId.toString())).toStrictEqual(MockRecipeToIngredients);
  });

  it('should get a recipe-to-ingredient', async () => {
    service.findOne.mockReturnValue(MockRecipeToIngredients[0]);
    expect(await controller.findOne(
      MockRecipeToIngredients[0].subRecipeId.toString(),
      MockRecipeToIngredients[0].ingredientId.toString(),
    )).toStrictEqual(MockRecipeToIngredients[0]);
  });

  it('should be able to create a recipe-to-ingredient', async () => {
    service.create.mockReturnValue(MockRecipeToIngredients[0]);
    expect(await controller.create(
      MockRecipeToIngredients[0].subRecipe.recipeId.toString(),
      MockRecipeToIngredients[0].subRecipeId.toString(),
      MockRecipeToIngredients[0].ingredientId.toString(),
      MockRecipeToIngredients[0],
      MockUsers[0]
    )).toStrictEqual(MockRecipeToIngredients[0]);
  });

  it('should be able to update a recipe-to-ingredient', async () => {
    service.update.mockReturnValue(MockRecipeToIngredients[0]);
    expect(await controller.update(
      MockRecipeToIngredients[0].subRecipeId.toString(),
      MockRecipeToIngredients[0].ingredientId.toString(),
      MockRecipeToIngredients[0],
      MockUsers[0]
    )).toStrictEqual(MockRecipeToIngredients[0]);
  });

  it('should be able to update many recipe-to-ingredients', async () => {
    service.updateAll.mockReturnValue(MockRecipeToIngredients);
    expect(await controller.updateMany(
      MockRecipeToIngredients[0].subRecipe.recipeId.toString(),
      MockRecipeToIngredients[0].subRecipeId.toString(),
      MockRecipeToIngredients,
      MockUsers[0]
    )).toStrictEqual(MockRecipeToIngredients);
  });

  it('shold be able to delete a recipe-to-ingredient', async () => {
    expect(await controller.delete(
      MockRecipeToIngredients[0].subRecipeId.toString(),
      MockRecipeToIngredients[0].ingredientId.toString(),
      )).toBeDefined();
  });
});
