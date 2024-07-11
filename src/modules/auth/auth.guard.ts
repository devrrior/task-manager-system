import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { verifyToken } from './utils/jwtUtils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Credentials not provided');
    }
    const accessTokenSecretKey = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET_KEY',
    );
    const payload = verifyToken(token, accessTokenSecretKey);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    request['user'] = payload;
    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
