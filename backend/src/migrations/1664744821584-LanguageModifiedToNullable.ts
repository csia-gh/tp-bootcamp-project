import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageModifiedToNullable1664744821584 implements MigrationInterface {
    name = 'LanguageModifiedToNullable1664744821584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "language" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository" ALTER COLUMN "language" SET NOT NULL`);
    }

}
