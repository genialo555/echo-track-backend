import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Configuration CORS
    app.enableCors({
      origin: ['http://localhost:4000', 'http://127.0.0.1:4000'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
      ],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    });

    // Configuration du ValidationPipe global
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          return new BadRequestException(
            errors.map((err) => ({
              field: err.property,
              message: err.constraints
                ? Object.values(err.constraints).join(', ')
                : 'La validation a échoué',
            })),
          );
        },
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      }),
    );

    // Configuration Swagger
    const config = new DocumentBuilder()
      .setTitle('ECHOTRACK API')
      .setDescription('Documentation de l\'API ECHOTRACK')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Préfixe global pour l'API
    app.setGlobalPrefix('api');

    // Configuration du port
    const PORT = process.env.PORT || 3000;

    // Démarrage du serveur
    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Le serveur est démarré sur: http://localhost:${PORT}`);
      console.log(`📝 Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📚 Documentation API: http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

bootstrap().catch(err => {
  console.error('❌ Erreur lors du démarrage du serveur:', err);
  process.exit(1);
});