import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  @CacheKey('catalog')
  @CacheTTL(60 * 5)
  @Get()
  findAll() {
    return this.catalogService.findAll();
  }
}
