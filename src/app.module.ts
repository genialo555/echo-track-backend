import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importation des modules principaux
import { AdminModule } from './modules/admin/admin.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { TermsConditionsModule } from './modules/legal/terms-conditions/terms-conditions.module';

// Importation des services
import { AdminService } from './modules/admin/admin.service';
import { BusinessService } from './modules/business/business.service';
import { DigitalCampaignsService } from './modules/marketing/digital-campaigns.service';
import { MarketingCampaignsService } from './modules/marketing/marketing-campaigns.service';
import { CustomizeService } from './modules/notifications/customize.service';
import { HighEmissionsService } from './modules/notifications/high-emissions.service';
import { JourneyUpdatesService } from './modules/notifications/journey-updates.service';

// Importation des contrôleurs
import { AdminController } from './modules/admin/admin.controller';
import { BusinessController } from './modules/business/business.controller';
import { DigitalCampaignsController } from './modules/marketing/digital-campaigns.controller';
import { MarketingCampaignsController } from './modules/marketing/marketing-campaigns.controller';
import { SeoOptimizationController } from './modules/marketing/seo-optimization.controller';
import { CustomizeController } from './modules/notifications/customize.controller';
import { HighEmissionsController } from './modules/notifications/high-emissions.controller';
import { JourneyUpdatesController } from './modules/notifications/journey-updates.controller';
import { migrations } from './database/migrations';
import { start } from 'repl';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              const isProduction = configService.get<string>('NODE_ENV') === 'production';
              return {
                type: 'postgres',
                url: configService.get<string>('DATABASE_URL'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                migrations: migrations,
                migrationsRun: true,
                synchronize: !isProduction, // Désactivez en production
                logging: true,
                ssl: isProduction
                  ? { rejectUnauthorized: false } // SSL pour Heroku en production
                  : false,
              };
            },
        }),
        // Modules fonctionnels
        AdminModule,
        AnalyticsModule,
        AuthModule,
        UsersModule,
        VehiclesModule,
        TermsConditionsModule,
    ],
    controllers: [
        AppController,
        AdminController,
        BusinessController,
        DigitalCampaignsController,
        MarketingCampaignsController,
        SeoOptimizationController,
        CustomizeController,
        HighEmissionsController,
        JourneyUpdatesController,
    ],
    providers: [
        AppService,
        AdminService,
        BusinessService,
        DigitalCampaignsService,
        MarketingCampaignsService,
        CustomizeService,
        HighEmissionsService,
        JourneyUpdatesService,
    ],
})
export class AppModule {}