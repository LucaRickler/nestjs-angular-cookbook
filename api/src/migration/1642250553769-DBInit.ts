import {MigrationInterface, QueryRunner} from 'typeorm';

export class DBInit1642250553769 implements MigrationInterface {
    name = 'DBInit1642250553769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "admin" boolean NOT NULL, "password" text NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP DEFAULT now(), "title" text NOT NULL, "desc" text NOT NULL, "createUserId" integer, "modifyUserId" integer, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_recipe" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP DEFAULT now(), "recipeId" integer NOT NULL, "name" text NOT NULL, "desc" text NOT NULL, "instructions" text NOT NULL, "createUserId" integer, "modifyUserId" integer, "timeCookingtime" integer, "timeRestingtime" integer, "timePreptime" integer, CONSTRAINT "PK_6b38c282a67f2aa265069559fe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_to_ingredient" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP DEFAULT now(), "subRecipeId" integer NOT NULL, "ingredientId" integer NOT NULL, "quantity" integer NOT NULL, "createUserId" integer, "modifyUserId" integer, CONSTRAINT "PK_a3c7feb2a7ae9147fc9acb9495c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f09f0349012b2a9f4ea63d83ec" ON "recipe_to_ingredient" ("subRecipeId", "ingredientId") `);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP DEFAULT now(), "name" text NOT NULL, "symbol" text NOT NULL, "createUserId" integer, "modifyUserId" integer, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5618100486bb99d78de022e582" ON "unit" ("name") `);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "modifyTime" TIMESTAMP DEFAULT now(), "name" text NOT NULL, "createUserId" integer, "modifyUserId" integer, "unitId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_3c6486840eb624309c6d16cf7e1" FOREIGN KEY ("createUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_6337c1989dd1cd9e0d15f465f94" FOREIGN KEY ("modifyUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" ADD CONSTRAINT "FK_24dad7fd3b538946ad89ec3dee9" FOREIGN KEY ("createUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" ADD CONSTRAINT "FK_415f061070841f3dc66db98134c" FOREIGN KEY ("modifyUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" ADD CONSTRAINT "FK_76d7789f27d472b07a308a6a4ea" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_202599a29babde93bd55a09c8a4" FOREIGN KEY ("createUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_d4ca6561f8ef739f3167e008d7d" FOREIGN KEY ("modifyUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_ee607881156f53a199bde5fd522" FOREIGN KEY ("subRecipeId") REFERENCES "sub_recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_4591c4ddff35a3b2f6fe4b4a883" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_e730396bc3687af53386f71d336" FOREIGN KEY ("createUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_d1cab9affc2382e4c69786761c9" FOREIGN KEY ("modifyUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_34c21fa9979daf5415ab105dce6" FOREIGN KEY ("createUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_211b60813e18b767a2259a6e4fb" FOREIGN KEY ("modifyUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_5c15451ee870cfe7294ee1b5946" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_5c15451ee870cfe7294ee1b5946"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_211b60813e18b767a2259a6e4fb"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_34c21fa9979daf5415ab105dce6"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_d1cab9affc2382e4c69786761c9"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_e730396bc3687af53386f71d336"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_4591c4ddff35a3b2f6fe4b4a883"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_ee607881156f53a199bde5fd522"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_d4ca6561f8ef739f3167e008d7d"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_202599a29babde93bd55a09c8a4"`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" DROP CONSTRAINT "FK_76d7789f27d472b07a308a6a4ea"`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" DROP CONSTRAINT "FK_415f061070841f3dc66db98134c"`);
        await queryRunner.query(`ALTER TABLE "sub_recipe" DROP CONSTRAINT "FK_24dad7fd3b538946ad89ec3dee9"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_6337c1989dd1cd9e0d15f465f94"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_3c6486840eb624309c6d16cf7e1"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5618100486bb99d78de022e582"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f09f0349012b2a9f4ea63d83ec"`);
        await queryRunner.query(`DROP TABLE "recipe_to_ingredient"`);
        await queryRunner.query(`DROP TABLE "sub_recipe"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
