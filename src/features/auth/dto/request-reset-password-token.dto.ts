import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestResetPasswordTokenDto {
	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example your-email@domain.com',
		},
	)
	readonly email: string;
}
