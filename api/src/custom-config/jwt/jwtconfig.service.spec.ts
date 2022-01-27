import { Test, TestingModule } from '@nestjs/testing';
import { JwtconfigService } from './jwtconfig.service';
import { ConfigModule } from '@nestjs/config';

describe('JwtconfigService', () => {
  let service: JwtconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [JwtconfigService],
    }).compile();

    service = module.get<JwtconfigService>(JwtconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create config options', () => {
    expect(service.createJwtOptions()).toBeDefined();
  });
});
