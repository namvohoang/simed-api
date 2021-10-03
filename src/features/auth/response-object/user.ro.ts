import { ApiProperty } from '@nestjs/swagger';

export class UserRo {
	@ApiProperty()
	phoneNumber: string;

	@ApiProperty()
	firstName: string;

	@ApiProperty()
	lastName: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	gender: string;

	@ApiProperty()
	dateOfBirth: string;

	@ApiProperty()
	id: string;

	@ApiProperty()
	is2FA: boolean;

	@ApiProperty()
	isActive: boolean;

	@ApiProperty()
	isArchived: boolean;

	@ApiProperty()
	createDateTime: Date;

	@ApiProperty()
	lastChangedDateTime: Date;
}
