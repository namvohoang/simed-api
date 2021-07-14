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

				entities: ['dist/**/*.entity.js'],

				migrationsTableName: 'migration',

				migrations: ['src/migration/*.ts'],

				cli: {
					migrationsDir: 'src/migration',
				},
				synchronize: true,
				ssl:
					configService.get('NODE_ENV') === 'production'
						? { rejectUnauthorized: false }
						: false,
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
		EventsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
