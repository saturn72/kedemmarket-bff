import { WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EmitService } from './services/emit.service';

@WebSocketGateway({
  cors: true,
  path: '/notify',
})
export class AppGateway {
  constructor(private emitService: EmitService) {}

  afterInit(server: Server) {
    this.emitService.server = server;
  }
}
