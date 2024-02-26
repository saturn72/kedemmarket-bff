import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

export class SocketIoAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    // port = this.configService.get<number>('SOCKETIO.SERVER.PORT') ?
    port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

    const origin = this.app
      .get(ConfigService)
      .get<Array<string>>('cors.origins');
    // const path = this.configService.get<string>('SOCKETIO.SERVER.PATH');

    // const origin = origins.split(',');
    // options.path = path;
    options.cors = { origin };

    const msg = `Init websocket using \'socket.io\' with port: \'${port}\' and options: \'${options}\'`;
    console.log(msg);

    return super.createIOServer(port, options);
  }
}
