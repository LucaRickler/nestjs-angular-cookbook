import { Controller, Post, UseGuards, Get, Param, Body, Put, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PoliciesGuard } from '../../auth/guards/policies.guard';
import { CurrentUser } from '../../auth/user.decorator';
import { Action } from '../../casl/action.enum';
import { AppAbility } from '../../casl/casl-ability.factory';
import { CheckPolicies } from '../../casl/check-policies.decorator';
import { CreateUserDTO } from '../models/create-user.dto';
import { UpdateUserDTO } from '../models/update-user.dto';
import { User } from '../models/user.entity';
import { UsersService } from '../service/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, User))
  @Post()
  newUser(
    @Body() createUserDTO: CreateUserDTO
  ) {
    return this.userService.create(createUserDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':username')
  updateUser(
    @Param('username') username: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.update(updateUserDTO, currentUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':username')
  delete(
    @Param('username') username: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.delete(username, currentUser);
  }
}
