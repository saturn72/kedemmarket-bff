import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';
import { AppModule } from './app.module';
import { RawServerDefault } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { AppCheckGuard } from './core/guards/app-check.guard';
import { Logger } from '@nestjs/common';
import fastifySocketIO from "fastify-socket.io";
import { AppGateway } from './core/gateways/app.gateway';
//import { SocketIoAdapter } from './core/adapters/socketio.adapter';

let app: NestFastifyApplication<RawServerDefault>;
const fastify = new FastifyAdapter({ caseSensitive: false });
let allowedOrigins: string[];

fastify.register(fastifyCors, () => {
  const logger = new Logger('fastify/cors');
  return (req, callback) => {
    if (
      !allowedOrigins ||
      allowedOrigins == null ||
      allowedOrigins.length == 0
    ) {
      allowedOrigins = app
        .get(ConfigService)
        .get<Array<string>>('cors.origins');
      logger.log('Allowed origins: ', allowedOrigins);
    }

    const corsOptions: { origin: boolean } = { origin: false };

    if (allowedOrigins.some((o: string) => req.headers.origin.startsWith(o))) {
      corsOptions.origin = true;
    }
    callback(null, corsOptions);
  };
});

fastify.register(fastifySocketIO, { cors: "*", path: '/notify' });

async function bootstrap() {
  app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);

  const appCheckGuard = app.get(AppCheckGuard);
  app.useGlobalGuards(appCheckGuard);

  const env = process.env.NODE_ENV;
  console.log(`KEDEMMARKET-BFF application starts using env.: ${env}`);
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  console.log('KEDEMMARKET-BFF application starts on port:', port);

  //  app.useWebSocketAdapter(new SocketIoAdapter(app));
  await app.listen(port);
  console.log("application started")

  const ag = app.get(AppGateway);
  setInterval(() => ag.sendMessage({ key: "catalog:updated" }), 1000);
}

bootstrap();
