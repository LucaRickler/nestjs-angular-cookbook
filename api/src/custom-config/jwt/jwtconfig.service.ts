import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FileConfig } from '../file-config';

@Injectable()
export class JwtconfigService extends FileConfig implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    super();
   }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.secretReader(this.configService.get('JWTSECRET')),
      signOptions: { expiresIn: this.secretReader(this.configService.get('JWTEXPIRE')) },
    };
  }
}
