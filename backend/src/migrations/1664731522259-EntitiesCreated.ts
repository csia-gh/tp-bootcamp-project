import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesCreated1664731522259 implements MigrationInterface {
    name = 'EntitiesCreated1664731522259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "login" character varying NOT NULL, "avatar_url" character varying NOT NULL, "html_url" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repository" ("id" integer NOT NULL, "full_name" character varying NOT NULL, "description" character varying NOT NULL, "html_url" character varying NOT NULL, "language" character varying NOT NULL, "stargazers_count" integer NOT NULL, "ownerId" integer, CONSTRAINT "PK_b842c26651c6fc0b9ccd1c530e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contributions" ("userId" integer NOT NULL, "repositoryId" integer NOT NULL, CONSTRAINT "PK_5ef4d420429e407c7af020a14fb" PRIMARY KEY ("userId", "repositoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_55141bcc2980d26a4870712f3f" ON "contributions" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_632175054499a146d935f43b4b" ON "contributions" ("repositoryId") `);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_55141bcc2980d26a4870712f3f4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_632175054499a146d935f43b4b1" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_632175054499a146d935f43b4b1"`);
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_55141bcc2980d26a4870712f3f4"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_36ca13d9e734f9e2d02b0476d68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_632175054499a146d935f43b4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55141bcc2980d26a4870712f3f"`);
        await queryRunner.query(`DROP TABLE "contributions"`);
        await queryRunner.query(`DROP TABLE "repository"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
