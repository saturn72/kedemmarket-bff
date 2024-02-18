import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/core/firebase.service';

@Injectable()
export class CatalogService {

  constructor(private firebaseService: FirebaseService) { }

  async findAll(): Promise<any> {
    return await this.firebaseService.loadFromStorage("/catalog/index.json");
  }

  findOne(id: string) {
    return `This action returns a #${id} catalog`;
  }
}
