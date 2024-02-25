import { Body, Controller, Put } from '@nestjs/common';
import { EmitService } from 'src/core/services/emit.service';
import { updateHookDto } from './updateHookDto';

@Controller('hooks')
export class HooksController {
  constructor(private emit: EmitService) {}

  @Put()
  catalogUpdated(@Body() body: updateHookDto) {
    this.emit.server.emit(body.key, body.payload);
  }
}
