import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from '../models/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { MockIngredients } from '../models/ingredients.mock';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { MockType } from '../../mock/mock-type';
import { UnitsService } from '../../units/service/units.service';
import { MockUsers } from '../../users/models/users.mock';
import { serviceMockFactory } from '../../mock/service.mock';

describe('IngredientsService', () => {
  let service: IngredientsService;

  const ingredients: Ingredient[] = MockIngredients;
  let repositoryMock: MockType<Repository<Ingredient>>;

  let unitsService: MockType<UnitsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsService,
        {
          provide: getRepositoryToken(Ingredient),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UnitsService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
    repositoryMock = module.get(getRepositoryToken(Ingredient));
    unitsService = module.get(UnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all ingredients', async () => {
    repositoryMock.find.mockReturnValue(ingredients);
    expect(await service.findAll()).toStrictEqual(ingredients);
  });

  it('should find an ingredient', async () => {
    repositoryMock.findOne.mockReturnValue(ingredients[0]);
    expect(await service.findOneByName(ingredients[0].name)).toBe(ingredients[0]);
    expect(await service.findOneByID(ingredients[0].id)).toBe(ingredients[0]);
  });

  it('should be able to create a ingredient', async () => {
    repositoryMock.save.mockReturnValue(ingredients[0]);
    repositoryMock.findOne.mockReturnValue(undefined);
    unitsService.findOneByID.mockReturnValue(ingredients[0].unit)
    expect(await service.create({
      name: ingredients[0].name,
      unitId: ingredients[0].unit.id
    }, MockUsers[0])).toStrictEqual(ingredients[0]);
  });

  it('should throw on creation of duplicate ingredient', async () => {
    repositoryMock.findOne.mockReturnValue(ingredients[0]);
    let error: any;
    try {
      await service.create({
        name: ingredients[0].name,
        unitId: ingredients[0].unit.id
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should throw on creation of ingredient if unit is not defined', async () => {
    repositoryMock.findOne.mockReturnValue(undefined);
    unitsService.findOneByID.mockReturnValue(undefined);
    let error: any;
    try {
      await service.create({
        name: ingredients[0].name,
        unitId: ingredients[0].unit.id
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to update a ingredient', async () => {
    repositoryMock.save.mockReturnValue(ingredients[0]);
    repositoryMock.findOne.mockReturnValue(ingredients[0]);
    unitsService.findOneByID.mockReturnValue(ingredients[0].unit)
    expect(await service.update(ingredients[0].id, {
      name: ingredients[0].name,
      unitId: ingredients[0].unit.id
    }, MockUsers[0])).toStrictEqual(ingredients[0]);
  });

  it('should throw on update of not-existing ingredient', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(ingredients[0].id, {
        name: ingredients[0].name,
        unitId: ingredients[0].unit.id
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should throw on update of ingredient if unit is not defined', async () => {
    repositoryMock.findOne.mockReturnValue(ingredients[0]);
    unitsService.findOneByID.mockReturnValue(undefined);
    let error: any;
    try {
      await service.create({
        name: ingredients[0].name,
        unitId: ingredients[0].unit.id
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to delete an ingredient', async () => {
    expect(await service.delete(ingredients[0].id)).toBeTruthy();
  });
});
