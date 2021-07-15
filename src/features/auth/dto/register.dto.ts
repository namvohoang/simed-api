import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example joebriggs@mail.com',
		},
	)
	readonly email: string;

	@ApiProperty()
	@Matches(/^[a-zA-Z0-9]+$/, {
		message: 'Password contains only digit and word',
	})
	@MinLength(8, {
		message: 'Min length is 8 characters',
	})
	readonly password: string;

	@ApiProperty()
	@MinLength(3, {
		message: 'Minimum length is 3 characters',
	})
	@MaxLength(50, {
		message: 'Maximum length is 50 characters',
	})
	@Matches(/^[a-z ]+$/i, {
		message: 'Full name contains only text',
	})
	readonly firstName: string;

	@ApiProperty()
	@MinLength(3, {
		message: 'Minimum length is 3 characters',
	})
	@MaxLength(50, {
		message: 'Maximum length is 50 characters',
	})
	@Matches(/^[a-z ]+$/i, {
		message: 'Full name contains only text',
	})
	readonly lastName: string;

	@ApiProperty()
	@MinLength(3, {
		message: 'Minimum length is 6 characters',
	})
	@MaxLength(50, {
		message: 'Maximum length is 20 characters',
	})
	@Matches(/^[0-9 +]+$/i, {
		message: 'Phone contains only number',
	})
	readonly phoneNumber: string;
}
