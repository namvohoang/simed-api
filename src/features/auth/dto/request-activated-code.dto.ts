import { ApiProperty } from '@nestjs/swagger';

export class RequestActivatedCodeDto {
	@ApiProperty()
	readonly email: string;
}
