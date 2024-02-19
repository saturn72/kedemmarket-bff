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

let app: NestFastifyApplication<RawServerDefault>;
const fastify = new FastifyAdapter({ caseSensitive: false });
let allowedOrigins: string[];

fastify.register(fastifyCors, () => {
  return (req, callback) => {
    allowedOrigins ??= app
      .get(ConfigService)
      .get<Array<string>>('cors.origins');
    const corsOptions: { origin: boolean } = { origin: false };

    if (allowedOrigins.some((o: string) => o.startsWith(req.headers.origin))) {
      corsOptions.origin = true;
    }
    callback(null, corsOptions);
  };
});

async function bootstrap() {
  app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);

  const appCheckGuard = app.get(AppCheckGuard);
  app.useGlobalGuards(appCheckGuard);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  console.log("KEDEMMARKET-BFF application starts on port:", port);
  await app.listen(port);
}
bootstrap();
