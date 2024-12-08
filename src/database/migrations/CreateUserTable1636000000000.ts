// src/database/migrations/1636000000000-CreateUserTable.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1636000000000 implements MigrationInterface {
    name = 'CreateUserTable1636000000000';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "username" varchar NOT NULL,
                "email" varchar NOT NULL UNIQUE,
                "password" varchar NOT NULL,
                "isEmailConfirmed" boolean DEFAULT false,
                "isActive" boolean DEFAULT true,
                "role" varchar NOT NULL,
                "provider" varchar NOT NULL DEFAULT 'local',
                "profileImage" varchar,
                "firstName" varchar,
                "lastName" varchar,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "resetTokenExpires" TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}