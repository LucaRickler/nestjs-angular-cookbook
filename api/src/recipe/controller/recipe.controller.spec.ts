import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from '../service/recipe.service';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockType } from '../../mock/mock-type';
import { MockRecipes } from '../models/recipe.mock';
import { MockUsers } from '../../users/models/users.mock';

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: MockType<RecipeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get(RecipeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all recipes', async () => {
    service.findAll.mockReturnValue(MockRecipes);
    expect(await controller.findAll()).toStrictEqual(MockRecipes);
  });

  it('should get a recipe', async () => {
    service.findOne.mockReturnValue(MockRecipes[0]);
    expect(await controller.findOne(MockRecipes[0].id.toString())).toStrictEqual(MockRecipes[0]);
  });

  it('should be able to create a recipe', async () => {
    service.create.mockReturnValue(MockRecipes[0]);
    expect(await controller.create(
      {
        title: MockRecipes[0].title,
        desc: MockRecipes[0].desc
      },
      MockUsers[0]
    )).toStrictEqual(MockRecipes[0]);
  });

  it('should be able to update a recipe', async () => {
    service.update.mockReturnValue(MockRecipes[0]);
    expect(await controller.update(
      MockRecipes[0].id.toString(),
      {
        title: MockRecipes[0].title,
        desc: MockRecipes[0].desc
      },
      MockUsers[0]
    )).toStrictEqual(MockRecipes[0]);
  });

  it('shold be able to delete a recipe', async () => {
    expect(await controller.remove(MockRecipes[0].id.toString())).toBeDefined();
  });
});
