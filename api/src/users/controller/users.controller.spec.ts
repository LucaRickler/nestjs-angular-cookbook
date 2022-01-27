import { UsersController } from './users.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersService } from '../service/users.service';
import { User } from '../models/user.entity';
import { MockUsers } from '../models/users.mock';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockType } from '../../mock/mock-type';
import { CaslModule } from '../../casl/casl.module';

describe('UsersController', () => {
  let controller: UsersController;
  let service: MockType<UsersService>;

  const users: User[] = MockUsers;
  let testUser: User;
  let testPassword: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CaslModule],
      controllers: [UsersController],
      providers: [
        {
        provide: UsersService,
        useFactory: serviceMockFactory,
      }],
    }).compile();

    service = module.get(UsersService);
    controller = module.get<UsersController>(UsersController);
    testUser = {
      id: 20,
      admin: false,
      username: 'jack',
      password: 'password',
      email: 'jack@example.com',
      createTime: new Date(Date.now()),
      modifyTime: new Date(Date.now()),
    };
    testPassword = '12345';
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    service.findAll.mockReturnValue(users)
    expect(await controller.getAll()).toBe(users);
  });

  it('should find one user', async () => {
    service.findOne.mockReturnValue(users[0]);
    expect((await controller.getUser(users[0].username)).email).toBe(users[0].email);
  });

  it('should be able to create users', async () => {
    service.findOne.mockReturnValue(testUser);
    service.create.mockReturnValue(testUser);
    expect(await controller.newUser(testUser)).toBeTruthy();
    expect((await controller.getUser(testUser.username)).email).toBe(testUser.email);
  });

  it('should be able to update users', async () => {
    service.findOne.mockReturnValue(testUser);
    service.update.mockReturnValue(testUser);
    expect(await controller.updateUser(
      testUser.username,
      testUser,
      testUser,
    )).toBeTruthy();
  });

  it('should be able to delete users', async () => {
    service.findOne.mockReturnValue(testUser);
    expect((await controller.delete(testUser.username, testUser)).affected).toBe(1);
  });
});
