import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty()
	@Matches(/^[a-zA-Z0-9]+$/, {
		message: 'Password contains only digit and word',
	})
	@MinLength(8, {
		message: 'Password Min length is 8 characters',
	})
	readonly password: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly resetPasswordToken: number;

	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example your-email@domain.com',
		},
	)
	readonly email: string;
}
