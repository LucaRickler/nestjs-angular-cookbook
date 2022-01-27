import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersController } from './controller/users.controller';
import { UsersResolver } from './resolver/users.resolver';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CaslModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule { }
