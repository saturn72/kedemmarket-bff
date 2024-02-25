import { CacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class SseCacheExclusionHttpInterceptor extends CacheInterceptor {

    exclusionPaths = '/sse'

    isRequestCacheable(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const urlParts = req.url.split('/')

        if (!this.allowedMethods.includes(req.method)) {
            return false;
        }
        return urlParts.includes('sse') ? false : true;
    }
}