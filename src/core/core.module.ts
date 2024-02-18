import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AppCheckGuard } from './guards/app-check.guard';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  providers: [
    FirebaseService,
    AppCheckGuard
  ],
  imports: [
    HttpModule
  ],
  exports: [
    FirebaseService,
    AppCheckGuard
  ]
})
export class CoreModule { }
