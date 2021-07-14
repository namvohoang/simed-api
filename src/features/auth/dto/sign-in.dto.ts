import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class SignInDto {
	@ApiProperty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@Matches(/^[a-zA-Z0-9]+$/, {
		message: 'Password contains only digit and word',
	})
	readonly password: string;
}
