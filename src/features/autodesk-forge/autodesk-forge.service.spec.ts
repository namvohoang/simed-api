import { Test, TestingModule } from '@nestjs/testing';
import { AutodeskForgeService } from './autodesk-forge.service';

describe('AutodeskForgeService', () => {
	let service: AutodeskForgeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AutodeskForgeService],
		}).compile();

		service = module.get<AutodeskForgeService>(AutodeskForgeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
