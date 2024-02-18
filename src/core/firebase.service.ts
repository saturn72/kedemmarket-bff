import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { App, AppOptions, initializeApp } from "firebase-admin/app";
import { AppCheck, getAppCheck } from "firebase-admin/app-check";
import { getStorage, getDownloadURL } from 'firebase-admin/storage';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class FirebaseService {
    private readonly appCheck: AppCheck;
    private readonly config: AppOptions;
    private readonly logger: Logger = new Logger(FirebaseService.name);

    constructor(
        private configService: ConfigService,
        private httpService: HttpService) {

        this.config = this.configService.get<AppOptions>('firebase');
        initializeApp(this.config);
        this.appCheck = getAppCheck();
    }

    async verifyAppCheckToken(token: any): Promise<boolean> {
        const claims = await this.appCheck.verifyToken(token);
        return claims && !claims.alreadyConsumed;
    }

    async loadFromStorage(path: string): Promise<AxiosResponse<any>> {
        const downloadUrl = await this.getDownloadUrl(path);

        const { data } = await firstValueFrom(
            this.httpService.get<any>(downloadUrl).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    private async getDownloadUrl(uri: string): Promise<string | null> {
        while (uri.startsWith('/')) {
            uri = uri.substring(1);
        }
        uri = uri.replaceAll("  ", " ").replaceAll(' ', '-').toLowerCase();

        try {
            const fileRef = getStorage().bucket().file(uri);
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
