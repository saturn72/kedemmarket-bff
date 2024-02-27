import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { AppCheckGuard } from './guards/app-check.guard';
import { HttpModule } from '@nestjs/axios';
import { EmitService } from './services/emit.service';
import { AppGateway } from './gateways/app.gateway';

@Global()
@Module({
  providers: [AppCheckGuard, AppGateway, EmitService, FirebaseService],
  imports: [HttpModule],
  exports: [AppCheckGuard, EmitService, FirebaseService],
})
export class CoreModule { }
