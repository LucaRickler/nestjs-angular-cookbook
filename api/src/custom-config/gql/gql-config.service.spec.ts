import { Test, TestingModule } from '@nestjs/testing';
import { GqlConfigService } from './gql-config.service';
import { ConfigModule } from '@nestjs/config';

describe('GqlConfigService', () => {
  let service: GqlConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [GqlConfigService],
    }).compile();

    service = module.get<GqlConfigService>(GqlConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create config options', () => {
    expect(service.createGqlOptions()).toBeDefined();
    expect(service.createGqlOptions().context).toBeDefined();
  });
});
