import {
	HttpException,
	HttpStatus,
	Injectable,
	BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
	tokenExpired,
	refreshTokenExpired,
	sendGridSender,
} from 'src/app.config';
import {
	buildRegisterRO,
	buildRequestResetPasswordTokenRO,
	buildResetPasswordRO,
	buildSignInRO,
	buildUserRO,
	buildVerifyActivatedCodeRO,
} from './auth.helper';
import { JwtPayload } from './interface/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { ActivatedCodeEntity } from 'src/database/entity/activated-code.entity';
import { MailerService } from 'src/shared/services/mailer.service';
import { VerifyActivatedCodeDto } from './dto/verify-activated-code.dto';
import { RequestActivatedCodeDto } from './dto/request-activated-code.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		@InjectRepository(ActivatedCodeEntity)
		private activatedCodeRepository: Repository<ActivatedCodeEntity>,
		private readonly jwtService: JwtService,
		private readonly mailerService: MailerService,
	) {}

	async login(data: any): Promise<any> {
		const userToAttempt = await this.userRepository.findOne({
			email: data.email,
		});
		if (userToAttempt == null) {
			throw new HttpException(
				'User with this email does not exist',
				HttpStatus.NOT_FOUND,
			);
		}
		const isMatch = await userToAttempt.comparePassword(data.password);
		if (!isMatch) {
			throw new HttpException(
				'The password you have entered is incorrect. Please try again or click on Forgot Password',
				HttpStatus.UNAUTHORIZED,
			);
		}
		const refreshToken = this.createJwtPayload(
			userToAttempt,
			refreshTokenExpired,
		);
		userToAttempt.refreshToken = refreshToken;
		const jwt = this.createJwtPayload(userToAttempt, tokenExpired);
		await this.userRepository.save(userToAttempt);
		return new Promise((resolve) => {
			resolve(buildSignInRO(userToAttempt, jwt));
		});
	}

	async register(data: RegisterDto): Promise<UserEntity> {
		const tempUser = await this.userRepository.findOne({ email: data.email });
		if (tempUser) {
			throw new HttpException(
				'This email has already registered',
				HttpStatus.BAD_REQUEST,
			);
		}
		const user = await this.userRepository.create(data);
		try {
			const userToAttempt = await this.userRepository.save(user);
			const refreshToken = this.createJwtPayload(
				userToAttempt,
				refreshTokenExpired,
			);
			userToAttempt.refreshToken = refreshToken;
			const jwt = this.createJwtPayload(userToAttempt, tokenExpired);
			await this.userRepository.save(userToAttempt);
			return new Promise((resolve) => {
				resolve(buildRegisterRO(userToAttempt, jwt));
			});
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async getUserById(id: string): Promise<UserEntity> {
		const userToAttempt = await this.userRepository.findOne(id);
		const jwt = this.createJwtPayload(userToAttempt, tokenExpired);
		return new Promise((resolve) => {
			resolve(buildSignInRO(userToAttempt, jwt));
		});
	}

	async getUserByEmail(payload: JwtPayload): Promise<UserEntity> {
		const userToAttempt = await this.userRepository.findOne({
			email: payload.email,
		});
		if (userToAttempt == null) {
			throw new HttpException(
				'User with this email does not exist',
				HttpStatus.NOT_FOUND,
			);
		}
		return new Promise((resolve) => {
			resolve(buildUserRO(userToAttempt));
		});
	}

	async getTokenByRefreshToken(refreshTokenDto: any): Promise<any> {
		const data = this.jwtService.verify(refreshTokenDto.refreshToken);
		const userToAttempt = await this.userRepository.findOne({
			refreshToken: refreshTokenDto.refreshToken,
			id: data.userId,
		});
		if (userToAttempt == null) {
			throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
		}
		const jwt = this.createJwtPayload(userToAttempt, tokenExpired);
		return new Promise((resolve) => {
			resolve(buildSignInRO(userToAttempt, jwt));
		});
	}

	async requestActivatedCode(
		requestActivatedCode: RequestActivatedCodeDto,
	): Promise<any> {
		const codeToAttempt = await this.activatedCodeRepository.findOne({
			email: requestActivatedCode.email,
		});
		const activatedCode = Math.floor(Math.random() * 1000000) + 1;
		if (codeToAttempt == null) {
			const code = this.activatedCodeRepository.create();
			code.activatedCode = activatedCode;
			code.email = requestActivatedCode.email;
			this.activatedCodeRepository.save(code);
		} else {
			codeToAttempt.activatedCode = activatedCode;
			this.activatedCodeRepository.save(codeToAttempt);
		}
		await this.sendEmailActivatedCode(
			requestActivatedCode.email,
			activatedCode,
		);
	}

	async verifyActivatedCode(
		verifyActivatedCode: VerifyActivatedCodeDto,
	): Promise<any> {
		const codeToAttempt = await this.activatedCodeRepository.findOne({
			activatedCode: verifyActivatedCode.activatedCode,
			email: verifyActivatedCode.email,
		});
		if (codeToAttempt == null) {
			throw new HttpException(
				'The activated code or Email does not exist',
				HttpStatus.NOT_FOUND,
			);
		}
		return new Promise((resolve) => {
			resolve(buildVerifyActivatedCodeRO(codeToAttempt));
		});
	}

	async requestResetPasswordToken(
		requestResetPasswordTokenDto: any,
	): Promise<any> {
		const userToAttempt = await this.userRepository.findOne({
			email: requestResetPasswordTokenDto.email,
		});
		//const resetPasswordToken = uuidv4();
		const resetPasswordToken = Math.floor(Math.random() * 1000000) + 1;
		if (userToAttempt) {
			userToAttempt.resetPasswordToken = resetPasswordToken;
			await this.userRepository.save(userToAttempt);
			await this.sendEmailResetPassword(userToAttempt);
		} else {
			await this.sendEmailResetPassword({
				email: requestResetPasswordTokenDto.email,
				resetPasswordToken: resetPasswordToken,
			});
		}
		return new Promise((resolve) => {
			resolve(buildRequestResetPasswordTokenRO(userToAttempt));
		});
	}

	async resetPassword(resetPasswordDto: any): Promise<any> {
		const userToAttempt = await this.userRepository.findOne({
			resetPasswordToken: resetPasswordDto.resetPasswordToken,
			email: resetPasswordDto.email,
		});
		if (userToAttempt == null) {
			throw new HttpException(
				'Reset token or Email does not exist',
				HttpStatus.NOT_FOUND,
			);
		}
		userToAttempt.password = await bcrypt.hash(resetPasswordDto.password, 10);
		await this.userRepository.save(userToAttempt);
		return new Promise((resolve) => {
			resolve(buildResetPasswordRO(userToAttempt));
		});
	}

	private createJwtPayload(user, tokenExpired): string {
		const data: JwtPayload = {
			email: user.email,
			userId: user.id,
		};
		return this.jwtService.sign(data, { expiresIn: tokenExpired });
	}

	private async sendEmailResetPassword(user): Promise<any> {
		const html = `<p>${user.resetPasswordToken}</p>`;
		const { subject, text, content } = {
			subject: 'Password Reset',
			text: 'Kaimono',
			content: html,
		};
		await this.mailerService.sendMail(
			user.email,
			sendGridSender,
			subject,
			text,
			content,
		);
	}

	private async sendEmailActivatedCode(email, activatedCode): Promise<any> {
		const html = `<p>${activatedCode}</p>`;
		const { subject, text, content } = {
			subject: 'Activated Code',
			text: 'Kaimono',
			content: html,
		};
		await this.mailerService.sendMail(
			email,
			sendGridSender,
			subject,
			text,
			content,
		);
	}
}
