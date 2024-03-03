import { Body, Controller, Logger, Put } from '@nestjs/common';
import { EmitService } from 'src/core/services/emit.service';

@Controller('hooks')
export class HooksController {
  private logger: Logger = new Logger(HooksController.name);

  constructor(private emit: EmitService) { }

  @Put()
  catalogUpdated(@Body() body: { key: string; payload: any }) {
    this.logger.log("web-hook was triggered: " + JSON.stringify(body));
    this.emit.server.emit(body.key, body.payload);
  }
}
