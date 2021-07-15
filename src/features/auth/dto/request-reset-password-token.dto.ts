import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestResetPasswordTokenDto {
	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example joebriggs@mail.com',
		},
	)
	readonly email: string;
}
