import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnhanceUserAuth1700000000000 implements MigrationInterface {
  name = 'EnhanceUserAuth1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ajouter les colonnes pour améliorer l'authentification
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS "refreshToken" VARCHAR,
      ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "failedLoginAttempts" INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "accountLockedUntil" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "lastPasswordChange" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "confirmationTokenExpires" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprimer les colonnes ajoutées
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN IF EXISTS "refreshToken",
      DROP COLUMN IF EXISTS "refreshTokenExpiresAt",
      DROP COLUMN IF EXISTS "failedLoginAttempts",
      DROP COLUMN IF EXISTS "accountLockedUntil",
      DROP COLUMN IF EXISTS "lastPasswordChange",
      DROP COLUMN IF EXISTS "confirmationTokenExpires",
      DROP COLUMN IF EXISTS "deletedAt"
    `);
  }
}
