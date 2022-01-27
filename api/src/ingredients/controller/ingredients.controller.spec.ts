import { Test, TestingModule } from '@nestjs/testing';
import { MockType } from '../../mock/mock-type';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockUsers } from '../../users/models/users.mock';
import { MockIngredients } from '../models/ingredients.mock';
import { IngredientsService } from '../service/ingredients.service';
import { IngredientsController } from './ingredients.controller';

describe('Ingredients Controller', () => {
  let controller: IngredientsController;
  let service: MockType<IngredientsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [
        {
          provide: IngredientsService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<IngredientsController>(IngredientsController);
    service = module.get(IngredientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all ingredients', async () => {
    service.findAll.mockReturnValue(MockIngredients);
    expect(await controller.getAll()).toStrictEqual(MockIngredients);
  });

  it('should get a ingredient', async () => {
    service.findOneByID.mockReturnValue(MockIngredients[0]);
    expect(await controller.getIngredientByID( MockIngredients[0].id.toString() )).toStrictEqual(MockIngredients[0]);
  });

  it('should be able to create a ingredient', async () => {
    service.create.mockReturnValue(MockIngredients[0]);
    expect(await controller.newIngredient(
      {
        name: MockIngredients[0].name,
        unitId: MockIngredients[0].unit.id,
      }, MockUsers[0])).toStrictEqual(MockIngredients[0]);
  });

  it('shold be able to delete a ingredient', async () => {
    expect(await controller.delete(MockIngredients[0].id.toString())).toBeDefined();
  });
});
