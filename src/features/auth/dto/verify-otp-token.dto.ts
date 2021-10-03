import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPTokenDto {
	@ApiProperty()
	readonly otpToken: string;
}
