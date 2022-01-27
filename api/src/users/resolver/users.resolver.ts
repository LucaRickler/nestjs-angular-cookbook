import { User } from '../models/user.entity';
import { UsersService } from '../service/users.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql.guard';
import { CreateUserDTO } from '../models/create-user.dto';
import { CurrentUser } from '../../auth/user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Query(returns => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async getUser(
    @Args('username') username: string,
  ) {
    return this.userService.findOne(username);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('user') user: CreateUserDTO,
  ) {
    return this.userService.create(user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('user') user: CreateUserDTO,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.update(user, currentUser);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @Args('user') user: CreateUserDTO,
    @CurrentUser() currentUser: User,
    ) {
    return this.userService.delete(user.username, currentUser);
  }
}
