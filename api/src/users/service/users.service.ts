import {
  ConflictException,
  Injectable,
  OnApplicationBootstrap,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindConditions } from 'typeorm';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../models/create-user.dto';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { Action } from '../../casl/action.enum';
import { UnauthorizedError } from 'type-graphql';
import { DemoUser } from '../models/demo.user.data';
import { UpdateUserDTO } from '../models/update-user.dto';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO == null) {
      throw new UnprocessableEntityException();
    }
    if (await this.findOne(createUserDTO.username)) {
      throw new ConflictException();
    }
    const user: User = new User();
    user.username = createUserDTO.username;
    user.email = createUserDTO.email;
    user.password = await bcrypt.hash(createUserDTO.password, 10);
    user.admin = createUserDTO.admin;
    return this.userRepository.save(user);
  }

  async update(updateUserDTO: UpdateUserDTO, currentUser: User): Promise<User> {
    const user = await this.findOne(updateUserDTO.username);
    if (!user) {
      throw new UnprocessableEntityException();
    }

    const ability = this.caslAbilityFactory.createForUser(currentUser);
    if (ability.cannot(Action.Update, user)) {
      throw new UnauthorizedError();
    }

    if (updateUserDTO.password) {
      user.password = await bcrypt.hash(updateUserDTO.password, 10);
    }
    if (updateUserDTO.email) {
      user.email = updateUserDTO.email;
    }
    user.admin = updateUserDTO.admin;

    return this.userRepository.save(user);
  }

  async delete(username: string, currentUser: User): Promise<DeleteResult> {
    const user = await this.findOne(username);
    if (!user) {
      throw new UnprocessableEntityException();
    }

    const ability = this.caslAbilityFactory.createForUser(currentUser);
    if (ability.cannot(Action.Update, user)) {
      throw new UnauthorizedError();
    }

    return this.userRepository.delete({ username } as FindConditions<User>);
  }

  async onApplicationBootstrap(): Promise<void> {
    const users = await this.findAll();
    if (users.length === 0 || !users.find(u => u.admin)) {
      const demo = await this.findOne(DemoUser.username);
      if (!demo) {
        await this.create(DemoUser);
      }
      else {
        await this.update(DemoUser, demo);
      }
    }
  }
}
