import { Controller, Post, Body, Query, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AllowAccess } from 'src/shared/enums/AllowAccess.enum';
import { PolicyKey } from 'src/shared/enums/PolicyKey.enum';
import { AutodeskForgeService } from './autodesk-forge.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UploadObjectDto } from './dto/upload-object.dto';

@Controller('autodesk-forge')
@ApiTags('Autodesk Forge')
export class AutodeskForgeController {
	constructor(private readonly autodeskForgeService: AutodeskForgeService, private configService: ConfigService) {}

	@ApiOperation({ summary: ' Get A 2 Legged Token ' })
	@Post('get-2-legged-token')
	async get2LeggedToken() {
		return await this.autodeskForgeService.get2LeggedToken();
	}

	@ApiOperation({ summary: ' Get Autodesk Token ' })
	@Post('get-token')
	async getToken() {
		return await this.autodeskForgeService.getToken().toPromise();
	}

	@ApiOperation({ summary: ' Creates an OSS Bucket ' })
	@ApiQuery({ name: 'policyKey', enum: PolicyKey, required: true })
	@ApiQuery({ name: 'access', enum: AllowAccess, required: false })
	@Post('create-bucket')
	async createBucket(
		@Body() createBucketDto: CreateBucketDto,
		@Query('policyKey') policyKey: PolicyKey = PolicyKey.TRANSIENT,
		@Query('access') access: AllowAccess = AllowAccess.FULL,
	) {
		createBucketDto.policyKey = policyKey;
		if (createBucketDto.allow) {
			createBucketDto.allow.access = access;
		}
		return await this.autodeskForgeService.createBucket(createBucketDto);
	}

	@ApiOperation({ summary: ' Uploads a file to a Bucket ' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@Put('upload-object')
	async uploadObject(@UploadedFile() file: Express.Multer.File, @Body() uploadObjectDto: UploadObjectDto) {
		uploadObjectDto.file = file;
		return await this.autodeskForgeService.uploadObject(uploadObjectDto);
	}
}
