import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tokenExpired } from 'src/app.config';
import { ActivatedCodeEntity } from 'src/database/entity/activated-code.entity';
import { UserEntity } from 'src/database/entity/user.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { MailerService } from 'src/shared/services/mailer.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, ActivatedCodeEntity]),
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		LoggerModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: tokenExpired,
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, MailerService],
	exports: [PassportModule],
})
export class AuthModule {}
