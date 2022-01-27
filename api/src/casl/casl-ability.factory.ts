import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.entity';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.admin) {
      can(Action.Manage, 'all'); // read-write access to everything
    }

    can(Action.Read, User);
    can(Action.Update, User, { id: user.id});
    can(Action.Delete, User, { id: user.id});

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
