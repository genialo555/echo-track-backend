import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => {
  // Validate required environment variables
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
  if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('DB_PORT must be a valid port number between 1 and 65535');
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'database', 'migrations', '*{.ts,.js}')],
    synchronize: false, // Disabled for safety
    migrationsRun: true, // Run migrations on application start
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: true,
    } : false,
  };
});