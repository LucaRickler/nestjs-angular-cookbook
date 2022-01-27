import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { GqlAuthGuard } from './guards/gql.guard';
import { AuthController } from './controller/auth.controller';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { JwtconfigService } from '../custom-config/jwt/jwtconfig.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    UsersModule,
    CaslModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      useClass: JwtconfigService,
      inject: [JwtconfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GqlAuthGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
