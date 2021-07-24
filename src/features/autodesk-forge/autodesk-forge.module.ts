import { Module } from '@nestjs/common';
import { AutodeskForgeService } from './autodesk-forge.service';
import { AutodeskForgeController } from './autodesk-forge.controller';

@Module({
	controllers: [AutodeskForgeController],
	providers: [AutodeskForgeService],
})
export class AutodeskForgeModule {}
