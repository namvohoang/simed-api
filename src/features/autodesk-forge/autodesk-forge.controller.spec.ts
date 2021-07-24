import { Test, TestingModule } from '@nestjs/testing';
import { AutodeskForgeController } from './autodesk-forge.controller';
import { AutodeskForgeService } from './autodesk-forge.service';

describe('AutodeskForgeController', () => {
	let controller: AutodeskForgeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AutodeskForgeController],
			providers: [AutodeskForgeService],
		}).compile();

		controller = module.get<AutodeskForgeController>(AutodeskForgeController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
