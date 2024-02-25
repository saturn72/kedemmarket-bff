import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class EmitService {
  public server: Server;
}
