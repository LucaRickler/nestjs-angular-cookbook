import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { repositoryMockFactory } from '../../mock/repository.mock';
import { MockUsers } from '../models/users.mock';
import { MockType } from '../../mock/mock-type';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  const users: User[] = MockUsers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        CaslAbilityFactory,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    repositoryMock.find.mockReturnValue(users);
    expect(await service.findAll()).toStrictEqual(users);
  });

  it('should find a user', async () => {
    repositoryMock.findOne.mockReturnValue(users[0]);
    expect(await service.findOne(users[0].username)).toBe(users[0]);
  });

  it('should be able to create a user', async () => {
    repositoryMock.save.mockReturnValue(users[0]);
    repositoryMock.findOne.mockReturnValue(undefined);
    expect(await service.create(users[0])).toStrictEqual(users[0]);
  });

  it('should throw on creation of duplicate user', async () => {
    repositoryMock.findOne.mockReturnValue(users[0]);
    let error: any;
    try {
      await service.create(users[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to update a user', async () => {
    repositoryMock.save.mockReturnValue(users[0]);
    repositoryMock.findOne.mockReturnValue(users[0]);
    expect(await service.update(users[0], users[0])).toStrictEqual(users[0]);
  });

  it('should throw on update of not-existing user', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(users[0], users[0]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should throw on update of user from different user', async () => {
    let error: any;
    try {
      repositoryMock.findOne.mockReturnValue(undefined);
      await service.update(users[0], users[1]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('should be able to delete a user', async () => {
      repositoryMock.findOne.mockReturnValue(users[0]);
      expect((await service.delete(users[0].username, users[0])).affected).toBe(1);
  });
});
