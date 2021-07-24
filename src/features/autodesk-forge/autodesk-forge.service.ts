import { Injectable } from '@nestjs/common';
import { CreateAutodeskForgeDto } from './dto/create-autodesk-forge.dto';
import { UpdateAutodeskForgeDto } from './dto/update-autodesk-forge.dto';

@Injectable()
export class AutodeskForgeService {
	create(createAutodeskForgeDto: CreateAutodeskForgeDto) {
		return 'This action adds a new autodeskForge';
	}

	findAll() {
		return `This action returns all autodeskForge`;
	}

	findOne(id: number) {
		return `This action returns a #${id} autodeskForge`;
	}

	update(id: number, updateAutodeskForgeDto: UpdateAutodeskForgeDto) {
		return `This action updates a #${id} autodeskForge`;
	}

	remove(id: number) {
		return `This action removes a #${id} autodeskForge`;
	}
}
