import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../mock/mock-type';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { MockUsers } from '../../users/models/users.mock';
import { Recipe } from '../models/recipe.entity';
import { MockRecipes } from '../models/recipe.mock';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  const recipes = MockRecipes;
  let repositoryMock: MockType<Repository<Recipe>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    repositoryMock = module.get(getRepositoryToken(Recipe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all recipes', async () => {
    repositoryMock.find.mockReturnValue(recipes);
    expect(await service.findAll()).toStrictEqual(recipes);
  });

  it('should find an recipe', async () => {
    repositoryMock.findOne.mockReturnValue(recipes[0]);
    expect(await service.findOne(recipes[0].id)).toBe(recipes[0]);
  });

  it('should be able to create a recipe', async () => {
    repositoryMock.save.mockReturnValue(recipes[0]);
    repositoryMock.findOne.mockReturnValue(undefined);
    expect(await service.create({
      title: recipes[0].title,
      desc: recipes[0].desc
    }, MockUsers[0])).toStrictEqual(recipes[0]);
  });

  it('should be able to update a recipe', async () => {
    repositoryMock.save.mockReturnValue(recipes[0]);
    repositoryMock.findOne.mockReturnValue(recipes[0]);
    expect(await service.update(recipes[0].id, {
      title: recipes[0].title,
      desc: recipes[0].desc
    }, MockUsers[0])).toStrictEqual(recipes[0]);
  });

  it('should throw on update of not-existing recipe', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(recipes[0].id, {
        title: recipes[0].title,
        desc: recipes[0].desc
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to delete an recipe', async () => {
    expect(await service.delete(recipes[0].id)).toBeTruthy();
  });
});
