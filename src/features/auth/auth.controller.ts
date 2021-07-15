import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { RequestResetPasswordTokenDto } from './dto/request-reset-password-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestActivatedCodeDto } from './dto/request-activated-code.dto';
import { VerifyActivatedCodeDto } from './dto/verify-activated-code.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: ' Sign up ' })
	@Post('register')
	async createUser(@Body() createUserDto: RegisterDto): Promise<any> {
		return await this.authService.register(createUserDto);
	}

	@ApiOperation({ summary: ' Sign in ' })
	@Post('login')
	async requestToken(@Body() requestTokenDto: SignInDto): Promise<any> {
		return await this.authService.login(requestTokenDto);
	}

	@ApiOperation({ summary: ' Get user by token ' })
	@ApiBearerAuth()
	@Get('info')
	@UseGuards(AuthGuard('jwt'))
	async getValidatedUser(@User('id') userId): Promise<any> {
		return await this.authService.getUserById(userId);
	}

	@ApiOperation({ summary: ' Refresh Token ' })
	@Post('refresh-token')
	async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
		return await this.authService.getTokenByRefreshToken(refreshTokenDto);
	}

	@ApiOperation({ summary: ' Request reset password token ' })
	@Post('request-reset-password-token')
	async requestResetPasswordToken(@Body() requestResetPasswordToken: RequestResetPasswordTokenDto): Promise<any> {
		return await this.authService.requestResetPasswordToken(requestResetPasswordToken);
	}

	@ApiOperation({ summary: ' Reset password ' })
	@Post('reset-password')
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
		return await this.authService.resetPassword(resetPasswordDto);
	}

	@ApiOperation({ summary: ' Request activated code ' })
	@Post('request-activated-code')
	async requestActivatedCode(@Body() requestActivatedCode: RequestActivatedCodeDto): Promise<any> {
		return await this.authService.requestActivatedCode(requestActivatedCode);
	}

	@ApiOperation({ summary: ' Verify activated code ' })
	@Post('verify-activated-code')
	async verifyActivatedCode(@Body() verifyActivatedCode: VerifyActivatedCodeDto): Promise<any> {
		return await this.authService.verifyActivatedCode(verifyActivatedCode);
	}
}
