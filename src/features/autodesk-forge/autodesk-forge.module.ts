import { Module } from '@nestjs/common';
import { AutodeskForgeService } from './autodesk-forge.service';
import { AutodeskForgeController } from './autodesk-forge.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	controllers: [AutodeskForgeController],
	providers: [AutodeskForgeService],
})
export class AutodeskForgeModule {}
