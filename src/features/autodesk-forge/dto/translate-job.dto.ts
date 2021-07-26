import { ApiProperty } from '@nestjs/swagger';

export class TranslateJobDto {
	@ApiProperty()
	urn: string;
}
