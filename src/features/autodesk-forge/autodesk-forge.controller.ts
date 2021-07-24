import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutodeskForgeService } from './autodesk-forge.service';
import { CreateAutodeskForgeDto } from './dto/create-autodesk-forge.dto';
import { UpdateAutodeskForgeDto } from './dto/update-autodesk-forge.dto';

@Controller('autodesk-forge')
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
}
