import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Injectable()
export class AppCheckGuard implements CanActivate {
  /**
   *
   */
  constructor(private firebase: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const appCheckPropertyName = Object.keys(req.headers).find(
      (key) => key.toLowerCase() === 'x-firebase-appcheck',
    );

    if (
      !appCheckPropertyName ||
      appCheckPropertyName == null ||
      appCheckPropertyName.trim().length == 0
    ) {
      return false;
    }

    const act = req.headers[appCheckPropertyName];
    return await this.firebase.verifyAppCheckToken(act);
  }
}
