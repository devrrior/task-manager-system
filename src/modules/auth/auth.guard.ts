import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
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
    const payload = this.authService.verifyToken(token, accessTokenSecretKey);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = this.userService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;

    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
