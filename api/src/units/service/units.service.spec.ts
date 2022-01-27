import { Test, TestingModule } from '@nestjs/testing';
import { UnitsService } from './units.service';
import { MockType } from '../../mock/mock-type';
import { Repository } from 'typeorm';
import { Unit } from '../models/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { MockUnits } from '../models/units.mock';
import { MockUsers } from '../../users/models/users.mock';

describe('UnitsService', () => {
  let service: UnitsService;
  let repositoryMock: MockType<Repository<Unit>>;

  const units: Unit[] = MockUnits;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        {
          provide: getRepositoryToken(Unit),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);
    repositoryMock = module.get(getRepositoryToken(Unit));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all units', async () => {
    repositoryMock.find.mockReturnValue(units);
    expect(await service.findAll()).toStrictEqual(units);
  });

  it('should find a unit', async () => {
    repositoryMock.findOne.mockReturnValue(units[0]);
    expect(await service.findOneByID(units[0].id)).toBe(units[0]);
    expect(await service.findOneByName(units[0].name)).toBe(units[0]);
  });

  it('should create a unit', async () => {
    repositoryMock.findOne.mockReturnValue(undefined);
    repositoryMock.save.mockReturnValue(units[0]);
    expect(await service.create({
      name: units[0].name,
      symbol: units[0].symbol
    }, MockUsers[0])).toStrictEqual(units[0]);
  });

  it('should throw on creation of duplicate unit', async () => {
    repositoryMock.findOne.mockReturnValue(units[0]);
    let error;
    try {
      await service.create({
        name: units[0].name,
        symbol: units[0].symbol
      }, MockUsers[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });
});
