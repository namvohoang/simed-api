import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyActivatedCodeDto {
	@ApiProperty()
	readonly activatedCode: number;

	@ApiProperty()
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email address, for example joebriggs@mail.com',
		},
	)
	readonly email: string;
}
