import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntity1637000000000 implements MigrationInterface {
  name = 'UpdateUserEntity1637000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Exemple de migration vers le haut
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "lastLogin" TIMESTAMP;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Exemple de migration vers le bas
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "lastLogin";
    `);
  }
}

export class EnhanceUserAuth1700000000000 implements MigrationInterface {
  name = 'EnhanceUserAuth1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "refreshToken" varchar;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" TIMESTAMP;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "failedLoginAttempts" integer DEFAULT 0;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "accountLockedUntil" TIMESTAMP;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lastPasswordChange" TIMESTAMP;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "confirmationTokenExpires" TIMESTAMP;
    `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP;
    `);

    // Add indexes
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_username" ON "users" ("username");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_refreshTokenExpiresAt" ON "users" ("refreshTokenExpiresAt");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_accountLockedUntil" ON "users" ("accountLockedUntil");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_confirmationTokenExpires" ON "users" ("confirmationTokenExpires");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_users_resetTokenExpires" ON "users" ("resetTokenExpires");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove indexes
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_email";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_username";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_refreshTokenExpiresAt";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_accountLockedUntil";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_confirmationTokenExpires";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_users_resetTokenExpires";
    `);

    // Remove columns
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "refreshToken";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "refreshTokenExpiresAt";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "failedLoginAttempts";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "accountLockedUntil";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "lastPasswordChange";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "confirmationTokenExpires";
    `);
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN IF EXISTS "deletedAt";
    `);
  }
}
