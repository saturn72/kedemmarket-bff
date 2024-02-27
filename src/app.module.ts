import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CatalogModule } from './catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import corsConfig from '@config/cors';
import firebaseConfig from '@config/firebase';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SseCacheExclusionHttpInterceptor } from './core/interceptors/CacheExclusionHttpInterceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HooksModule } from './hooks/hooks.module';
import { AppGateway } from './core/gateways/app.gateway';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    CatalogModule,
    ConfigModule.forRoot({
      load: [corsConfig, firebaseConfig],
      isGlobal: true,
    }),
    CoreModule,
    EventEmitterModule.forRoot(),
    HooksModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SseCacheExclusionHttpInterceptor,
    },
    AppGateway,
  ],
})
export class AppModule {}
