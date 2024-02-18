import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CatalogModule } from './catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import corsConfig from '@config/cors';
import firebaseConfig from '@config/firebase';

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
  ],
})
export class AppModule {}
