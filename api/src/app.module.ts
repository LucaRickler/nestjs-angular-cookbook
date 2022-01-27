import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { GqlConfigService } from './custom-config/gql/gql-config.service';
import { TypeOrmconfigService } from './custom-config/type-orm/type-ormconfig.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UnitsModule } from './units/units.module';
import { RecipeModule } from './recipe/recipe.module';
import { SubRecipeModule } from './sub-recipe/sub-recipe.module';
import { RecipeToIngredientModule } from './recipe-to-ingredient/recipe-to-ingredient.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    CaslModule,
    UsersModule,
    AuthModule,
    CustomConfigModule.forRoot({
      isGlobal: true,
      // ignoreEnvFile: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useClass: TypeOrmconfigService,
      inject: [TypeOrmconfigService],
    }),
    // GraphQLModule.forRootAsync({
    //   imports: [CustomConfigModule],
    //   useClass: GqlConfigService,
    //   inject: [GqlConfigService],
    // }),
    UnitsModule,
    IngredientsModule,
    RecipeModule,
    RecipeToIngredientModule,
    SubRecipeModule,
  ],
})
export class AppModule { }
