import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtconfigService } from '../../custom-config/jwt/jwtconfig.service';
import { CustomConfigModule } from '../../custom-config/custom-config.module';
import { serviceMockFactory } from '../../mock/service.mock';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [CustomConfigModule.forRoot()],
          useClass: JwtconfigService,
        }),
        CustomConfigModule.forRoot(),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useFactory: serviceMockFactory,
        },
        JwtconfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to login', async () => {
    expect(await controller.login({ user: { username: '', password: '' } })).toBeTruthy();
  });
});
