import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AllowAccess } from 'src/shared/enums/AllowAccess.enum';
import { PolicyKey } from 'src/shared/enums/PolicyKey.enum';

class Allow {
	@ApiProperty()
	authId: string;

	@ApiProperty({ enum: AllowAccess, enumName: 'Allow Access' })
	access: string;
}

export class CreateBucketDto {
	@ApiProperty()
	@IsNotEmpty()
	bucketKey: string;

	@ApiProperty({ type: () => Allow })
	@ApiPropertyOptional()
	@IsOptional()
	allow?: Allow;

	@ApiProperty({ enum: PolicyKey, enumName: 'Policy Key' })
	policyKey: string;
}
