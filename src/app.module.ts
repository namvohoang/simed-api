import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { StudentModule } from './features/student/student.module';
import { LoggerModule } from './logger/logger.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './features/events/events.module';
import { UserEntity } from './database/entity/user.entity';
import { ActivatedCodeEntity } from './database/entity/activated-code.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AutodeskForgeModule } from './features/autodesk-forge/autodesk-forge.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const entityInDev = [UserEntity, ActivatedCodeEntity];
const entityInProd = ['dist/**/*.entity.js'];

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['src/environments/.dev.env'],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',

				host: configService.get('POSTGRES_HOST'),
				port: parseInt(configService.get('POSTGRES_PORT')),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DATABASE'),

				entities: configService.get('NODE_ENV') === 'production' ? entityInProd : entityInDev,

				migrationsTableName: 'migration',

				migrations: ['src/migration/*.ts'],

				cli: {
					migrationsDir: 'src/migration',
				},
				synchronize: true,
				ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
				keepConnectionAlive: true,
			}),
		}),
		AuthModule,
		StudentModule,
		SharedModule,
		LoggerModule.forRoot(),
		SendGridModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				apiKey: configService.get('SENDGRID_API_KEY'),
			}),
		}),
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				ttl: configService.get('THROTTLE_TTL'),
				limit: configService.get('THROTTLE_LIMIT'),
			}),
		}),
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				dest: configService.get('MULTER_DEST'),
				storage: diskStorage({
					destination: configService.get('MULTER_DEST'),
				}),
			}),
			inject: [ConfigService],
		}),
		EventsModule,
		AutodeskForgeModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
