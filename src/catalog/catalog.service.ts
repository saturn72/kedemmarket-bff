import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/core/firebase/firebase.service';

@Injectable()
export class CatalogService {
  constructor(private firebaseService: FirebaseService) {}

  async findAll(): Promise<any> {
    return await this.firebaseService.getCatalog();
  }
}
