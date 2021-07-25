import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AllowAccess } from 'src/shared/enums/AllowAccess.enum';
import { PolicyKey } from 'src/shared/enums/PolicyKey.enum';
import { AutodeskForgeService } from './autodesk-forge.service';
import { CreateAutodeskForgeDto } from './dto/create-autodesk-forge.dto';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateAutodeskForgeDto } from './dto/update-autodesk-forge.dto';

@Controller('autodesk-forge')
@ApiTags('Autodesk Forge')
export class AutodeskForgeController {
	constructor(private readonly autodeskForgeService: AutodeskForgeService) {}

	@Post()
	create(@Body() createAutodeskForgeDto: CreateAutodeskForgeDto) {
		return this.autodeskForgeService.create(createAutodeskForgeDto);
	}

	@Get()
	findAll() {
		return this.autodeskForgeService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.autodeskForgeService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAutodeskForgeDto: UpdateAutodeskForgeDto) {
		return this.autodeskForgeService.update(+id, updateAutodeskForgeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.autodeskForgeService.remove(+id);
	}

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
		@Body() createBucket: CreateBucketDto,
		@Query('policyKey') policyKey: PolicyKey = PolicyKey.TRANSIENT,
		@Query('access') access: AllowAccess = AllowAccess.FULL,
	) {
		createBucket.policyKey = policyKey;
		if (createBucket.allow) {
			createBucket.allow.access = access;
		}
		return await this.autodeskForgeService.createBucket(createBucket);
	}
}
