import { Body, Controller, Put } from '@nestjs/common';
import { EmitService } from 'src/core/services/emit.service';

@Controller('hooks')
export class HooksController {
  constructor(private emit: EmitService) {}

  @Put()
  catalogUpdated(@Body() body: { key: string; payload: any }) {
    this.emit.server.emit(body.key, body.payload);
  }
}
