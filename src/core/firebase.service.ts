import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App, initializeApp } from "firebase-admin/app";
import { AppCheck, getAppCheck } from "firebase-admin/app-check";

@Injectable()
export class FirebaseService {
    app: App;
    appCheck: AppCheck;

    constructor(private configService: ConfigService) {
        const config = this.configService.get('firebase');
        this.app = initializeApp(config);
        this.appCheck = getAppCheck();
    }
    async verifyAppCheckToken(token: any): Promise<boolean> {
        const claims = await getAppCheck().verifyToken(token);
        return claims && !claims.alreadyConsumed;
    }
}
