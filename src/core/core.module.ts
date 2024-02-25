import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { AppCheckGuard } from './guards/app-check.guard';
import { HttpModule } from '@nestjs/axios';
import { AppGateway } from './app.gateway';
import { EmitService } from './services/emit.service';

@Global()
@Module({
  providers: [AppCheckGuard, AppGateway, EmitService, FirebaseService],
  imports: [HttpModule],
  exports: [AppCheckGuard, EmitService, FirebaseService],
})
export class CoreModule {}
