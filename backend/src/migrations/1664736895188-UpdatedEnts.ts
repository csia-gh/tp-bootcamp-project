import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEnts1664736895188 implements MigrationInterface {
    name = 'UpdatedEnts1664736895188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_55141bcc2980d26a4870712f3f4"`);
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_632175054499a146d935f43b4b1"`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_632175054499a146d935f43b4b1" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_55141bcc2980d26a4870712f3f4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_55141bcc2980d26a4870712f3f4"`);
        await queryRunner.query(`ALTER TABLE "contributions" DROP CONSTRAINT "FK_632175054499a146d935f43b4b1"`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_632175054499a146d935f43b4b1" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contributions" ADD CONSTRAINT "FK_55141bcc2980d26a4870712f3f4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
