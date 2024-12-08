import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTermsConditions1800000000000 implements MigrationInterface {
  name = 'AddTermsConditions1800000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Créer la table TermsConditions
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "terms_conditions" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "content" TEXT NOT NULL,
        "effectiveDate" TIMESTAMPTZ NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT now(),
        "updatedAt" TIMESTAMPTZ DEFAULT now()
      )
    `);

    // Créer la table TermsConditionsAcceptance
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "terms_conditions_acceptance" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "acceptedAt" TIMESTAMPTZ NOT NULL,
        "userId" uuid,
        "termsConditionsId" uuid,
        "createdAt" TIMESTAMPTZ DEFAULT now(),
        "updatedAt" TIMESTAMPTZ DEFAULT now(),
        CONSTRAINT "FK_user_terms_conditions_acceptance" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_terms_conditions_acceptance" FOREIGN KEY ("termsConditionsId") REFERENCES "terms_conditions"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprimer la table TermsConditionsAcceptance
    await queryRunner.query(`
      DROP TABLE IF EXISTS "terms_conditions_acceptance";
    `);

    // Supprimer la table TermsConditions
    await queryRunner.query(`
      DROP TABLE IF EXISTS "terms_conditions";
    `);
  }
}
