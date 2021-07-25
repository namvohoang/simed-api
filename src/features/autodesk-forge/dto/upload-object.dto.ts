import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadObjectDto {
	@ApiProperty()
	@IsNotEmpty()
	bucketKey: string;

	@ApiProperty({ type: 'file', format: 'binary' })
	file: Express.Multer.File;
}
