import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleAsyncOptions, GqlModuleOptions } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { join } from 'path/posix';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createGqlOptions(): GqlModuleOptions {
    return {
      debug: this.configService.get('DEBUG_MODE'),
      playground: this.configService.get('DEBUG_MODE'),
      autoSchemaFile: join(process.cwd(), this.configService.get('GQP_SCHEMA_FILE')),
      installSubscriptionHandlers: this.configService.get('GQL_SUBSCRIPTIONS_ACTIVE'),
      context: ({ req }) => ({ req }),
    };
  }
}
