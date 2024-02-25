import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { AppCheckGuard } from './guards/app-check.guard';
import { HttpModule } from '@nestjs/axios';
import { AppGateway } from './app.gateway';

@Global()
@Module({
  providers: [
    AppCheckGuard,
    AppGateway,
    FirebaseService,
  ],
  imports: [HttpModule],
  exports: [FirebaseService, AppCheckGuard],
})
export class CoreModule { }
