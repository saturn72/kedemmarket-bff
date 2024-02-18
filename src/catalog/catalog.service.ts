import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatalogService {

  private app: FirebaseApp;

  constructor(
    private configService: ConfigService,

  ) {
    const config = configService.get('firebase');
    this.app = initializeApp(config);
  }

  async findAll(): Promise<string> {
    const du = await this.getDownloadUrl("/catalog/index.json");

    return du ?? "test";
  }

  findOne(id: number) {
    return `This action returns a #${id} catalog`;
  }
  private async getDownloadUrl(uri: string): Promise<string | null> {
    while (uri.startsWith('/')) {
      uri = uri.substring(1);
    }
    uri = uri.replaceAll("  ", " ").replaceAll(' ', '-').toLowerCase();

    try {
      const s = getStorage(this.app);
      const r = ref(s, uri);
      return await getDownloadURL(r);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
