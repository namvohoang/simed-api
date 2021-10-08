import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example your-email@domain.com',
		},
	)
	readonly email: string;

	@ApiProperty()
	@Matches(/^[a-zA-Z0-9]+$/, {
		message: 'Password contains only digit and word',
	})
	@MinLength(8, {
		message: 'Password Min length is 8 characters',
	})
	readonly password: string;

	@ApiProperty()
	@MinLength(3, {
		message: 'First name Minimum length is 3 characters',
	})
	@MaxLength(50, {
		message: 'First name Maximum length is 50 characters',
	})
	@Matches(/^[a-z ]+$/i, {
		message: 'First name contains only text',
	})
	readonly firstName: string;

	@ApiProperty()
	@MinLength(3, {
		message: 'Last name Minimum length is 3 characters',
	})
	@MaxLength(50, {
		message: 'Last name Maximum length is 50 characters',
	})
	@Matches(/^[a-z ]+$/i, {
		message: 'Last name contains only text',
	})
	readonly lastName: string;

	@ApiProperty()
	@MinLength(6, {
		message: 'Phone Minimum length is 6 characters',
	})
	@MaxLength(50, {
		message: 'Phone Maximum length is 20 characters',
	})
	@Matches(/^[0-9 +]+$/i, {
		message: 'Phone contains only number',
	})
	readonly phoneNumber: string;
}
