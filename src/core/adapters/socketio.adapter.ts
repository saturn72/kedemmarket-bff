import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

export class SocketIoAdapter extends IoAdapter {
    constructor(private app: INestApplicationContext) {
        super(app);
    }

    createIOServer(port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        }) {
        // port = this.configService.get<number>('SOCKETIO.SERVER.PORT') ?
        port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

        const origin = this.app
            .get(ConfigService)
            .get<Array<string>>('cors.origins');

        options.cors = {
            origin,
            methods: ['GET', 'POST'],
        };
        options.path = '/notify';
        // options.transports = ['polling', 'websocket'];

        const o = JSON.stringify(options);
        const msg = `Init websocket using \'socket.io\' with port: \'${port}\' and options: \'${o}\'`;
        console.log(msg);

        return super.createIOServer(port, { ...options, cors: true });
    }
}
