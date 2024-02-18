import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AppCheckGuard } from './guards/app-check.guard';

@Global()
@Module({
  providers: [
    FirebaseService,
    AppCheckGuard]
})
export class CoreModule { }
