import { Module } from '@nestjs/common';
import { GqlConfigService } from './gql/gql-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmconfigService } from './type-orm/type-ormconfig.service';
import { JwtconfigService } from './jwt/jwtconfig.service';

@Module({
  providers: [
    GqlConfigService,
    TypeOrmconfigService,
    JwtconfigService,
  ],
  exports: [
    GqlConfigService,
    TypeOrmconfigService,
    JwtconfigService,
  ],
})
export class CustomConfigModule extends ConfigModule {}
