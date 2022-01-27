import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmconfigService } from './type-ormconfig.service';
import { ConfigModule } from '@nestjs/config';

describe('TypeOrmconfigService', () => {
  let service: TypeOrmconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [TypeOrmconfigService],
    }).compile();

    service = module.get<TypeOrmconfigService>(TypeOrmconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create config options', () => {
    expect(service.createTypeOrmOptions()).toBeDefined();
  });
});
