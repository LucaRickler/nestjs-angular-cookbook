import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseType } from 'typeorm';
import { FileConfig } from '../file-config';

@Injectable()
export class TypeOrmconfigService extends FileConfig implements TypeOrmOptionsFactory {
  private static postgres: DatabaseType = 'postgres';

  constructor(private readonly configService: ConfigService) {
    super();
   }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const output: TypeOrmModuleOptions = {
      type: TypeOrmconfigService.postgres,
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.secretReader(this.configService.get('DB_USERNAME')),
      password: this.secretReader(this.configService.get('DB_PASSWORD')),
      database: this.secretReader(this.configService.get('DATABASE')),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: [__dirname + '/../../migration/*{.ts,.js}'],
      migrationsRun: true,
      logging: ['migration', 'error', 'warn', 'schema', 'log'],
      cli: {
        migrationsDir: __dirname + '/../../migration',
      }
    } as TypeOrmModuleOptions;
    return output;
  }
}
