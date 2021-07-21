import { ApiProperty } from '@nestjs/swagger';
import { UserRo } from './user.ro';

export class SignInRo {
	@ApiProperty()
	token: string;

	@ApiProperty()
	refreshToken: string;

	@ApiProperty()
	expiredIn: number;

	@ApiProperty()
	user: UserRo;
}
