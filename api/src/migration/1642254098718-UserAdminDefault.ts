import {MigrationInterface, QueryRunner} from 'typeorm';

export class UserAdminDefault1642254098718 implements MigrationInterface {
    name = 'UserAdminDefault1642254098718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "admin" DROP DEFAULT`);
    }

}
