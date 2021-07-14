import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly refreshToken: string;
}
