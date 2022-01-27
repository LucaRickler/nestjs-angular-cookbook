import { Test, TestingModule } from '@nestjs/testing';
import { UnitsController } from './units.controller';
import { UnitsService } from '../service/units.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Unit } from '../models/unit.entity';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { MockUnits } from '../models/units.mock';
import { DeleteResult } from 'typeorm';
import { MockUsers } from '../../users/models/users.mock';

describe('Units Controller', () => {
  let controller: UnitsController;
  let service: UnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [
        UnitsService,
        {
          provide: getRepositoryToken(Unit),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UnitsController>(UnitsController);
    service = module.get<UnitsService>(UnitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all units', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => new Promise<Unit[]>(resolve => resolve(MockUnits)));
    expect(await controller.getAll()).toStrictEqual(MockUnits);
  });

  it('should get a unit', async () => {
    jest.spyOn(service, 'findOneByID').mockImplementation(() => new Promise<Unit>(resolve => resolve(MockUnits[0])));
    expect(await controller.getUnitByID(MockUnits[0].id.toString())).toStrictEqual(MockUnits[0]);
  });

  it('should be able to create a unit', async () => {
    jest.spyOn(service, 'create').mockImplementation(() => new Promise<Unit>(resolve => resolve(MockUnits[0])));
    expect(await controller.newUnit({ name: MockUnits[0].name, symbol: MockUnits[0].symbol }, MockUsers[0])).toStrictEqual(MockUnits[0]);
  });

  it('shold be able to delete a unit', async () => {
    jest.spyOn(service, 'delete').mockImplementation(() => new Promise<DeleteResult>(resolve => resolve({ raw: '', affected: 1 })));
    expect(await controller.delete(MockUnits[0].id.toString())).toBeDefined();
  });
});
