import { MigrationInterface, QueryRunner } from "typeorm";

export class TestEntCreated1664888846549 implements MigrationInterface {
    name = 'TestEntCreated1664888846549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_entity" ("id" integer NOT NULL, "full_name" character varying NOT NULL, "description" character varying NOT NULL, "html_url" character varying NOT NULL, "language" character varying, "stargazers_count" integer NOT NULL, CONSTRAINT "PK_cc0413536e3afc0e586996bea40" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_entity"`);
    }

}
