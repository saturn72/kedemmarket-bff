import { Controller, Get } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EmitService } from 'src/core/services/emit.service';

@Controller('admin')
export class AdminController {
  constructor(private emit: EmitService) {
  }

  @CacheKey('admin')
  @CacheTTL(1)
  @Get()
  updateCache() {
    this.emit.server.emit("/catalog/updated");
  }
}
