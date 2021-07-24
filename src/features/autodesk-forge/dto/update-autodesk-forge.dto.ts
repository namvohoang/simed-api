import { PartialType } from '@nestjs/swagger';
import { CreateAutodeskForgeDto } from './create-autodesk-forge.dto';

export class UpdateAutodeskForgeDto extends PartialType(CreateAutodeskForgeDto) {}
