import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export function getOrigin(): string[] {
  return process.env.CORS_ORIGIN?.split(',').map((c) => c.trim());
}

export function getSocketIOServerOptions(): { port: number; options: any } {
  const port = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 3300;
  const options = {
    cors: {
      origins: getOrigin(),
    },
    path: '/notify',
  };
  return { port, options };
}
