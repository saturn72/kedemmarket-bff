import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';
import { AppModule } from './app.module';
import { RawServerDefault } from 'fastify';
import { AppCheckGuard } from './core/guards/app-check.guard';
import { Logger } from '@nestjs/common';
import fastifySocketIO from "fastify-socket.io";
import { AppGateway } from './core/gateways/app.gateway';
import { getOrigin } from './utils';
//import { SocketIoAdapter } from './core/adapters/socketio.adapter';

let app: NestFastifyApplication<RawServerDefault>;
const fastify = new FastifyAdapter({ caseSensitive: false });

fastify.register(fastifyCors, () => {
  const logger = new Logger('fastify/cors');
  const allowedOrigins = getOrigin();
  logger.log('Allowed origins: ', allowedOrigins);
  return (req, callback) => {

    const corsOptions: { origin: boolean } = { origin: false };
    const origin: string = req.headers.origin;

    if (origin && allowedOrigins.some((o: string) => origin.startsWith(o))) {
      corsOptions.origin = true;
    }
    callback(null, corsOptions);
  };
});


const o = {
  cors: { origin: getOrigin() }, path: '/notify'
};

console.log(`socketio start with options: ${JSON.stringify(o)}`);

fastify.register(fastifySocketIO, o);

async function bootstrap() {
  app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);
  //  app.useWebSocketAdapter(new SocketIoAdapter(app));

  const appCheckGuard = app.get(AppCheckGuard);
  app.useGlobalGuards(appCheckGuard);

  const env = process.env.NODE_ENV;
  console.log(`KEDEMMARKET-BFF application starts using env.: ${env}`);
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  console.log('KEDEMMARKET-BFF application starts on port:', port);

  await app.listen(port);
  console.log("application started")

  const ag = app.get(AppGateway);
  setInterval(() => ag.sendMessage({ key: "catalog:updated" }), 1000);
}

bootstrap();

