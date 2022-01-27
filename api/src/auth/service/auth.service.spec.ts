import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import { MockUsers } from '../../users/models/users.mock';
import { JwtconfigService } from '../../custom-config/jwt/jwtconfig.service';
import { CustomConfigModule } from '../../custom-config/custom-config.module';
import { serviceMockFactory } from '../../mock/service.mock';
import { MockType } from '../../mock/mock-type';
import * as bcrypt from 'bcryptjs';
import { User } from '../../users/models/user.entity';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let userService: MockType<UsersService>;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [CustomConfigModule.forRoot()],
          useClass: JwtconfigService,
        }),
        CustomConfigModule.forRoot(),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useFactory: serviceMockFactory,
        },
        JwtconfigService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UsersService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test user validation', async () => {
    const { password, ...result } = MockUsers[0];
    const user: User = { ...result, password: await bcrypt.hash(password, 10) };
    userService.findOne.mockReturnValue(user);
    expect(await service.validateUser(result.username, password)).toStrictEqual(result);

    expect(await service.validateUser('', '')).toBeNull();
  });

  it('test login', async () => {
    const jwt = await service.login({username: '', password: ''});
    expect(jwt).toBeTruthy();
    expect(typeof(jwt.access_token)).toBe(typeof(''));
    expect(jwt.expiresIn).toStrictEqual(config.get('JWTEXPIRE'));
  });
});
