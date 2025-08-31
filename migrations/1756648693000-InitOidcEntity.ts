import { MigrationInterface, QueryRunner } from "typeorm";

export class InitOidcEntity1756648693000 implements MigrationInterface {
    name = 'InitOidcEntity1756648693000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "oidc_entity" ("createdOn" TIMESTAMP NOT NULL DEFAULT now(), "modifiedOn" TIMESTAMP NOT NULL DEFAULT now(), "id" character varying NOT NULL, "type" integer NOT NULL, "payload" jsonb NOT NULL, "grantId" character varying, "userCode" character varying, "uid" character varying, "consumedAt" TIMESTAMP, "expiresAt" TIMESTAMP, CONSTRAINT "UQ_23d016d7e56d201009c0922ebdc" UNIQUE ("uid"), CONSTRAINT "PK_a57c9e55b13e56a864c775d605a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "oidc_entity"`);
    }

}
