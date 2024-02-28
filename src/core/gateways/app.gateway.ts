import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { getOrigin } from '../../utils';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const getPort = (): number =>
  process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 0;

const wsoptions = {
  cors: {
    origins: getOrigin(),
  },
  path: '/notify/',
};
const port = getPort();
@WebSocketGateway(port, wsoptions)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;
  private readonly logger = new Logger(AppGateway.name);

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  sendMessage(data: { key: string; payload?: any }): void {
    this.io.emit(data.key, data);
  }
}
