import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { CreateTokensRequestDto } from './dtos/requests/create-tokens.request.dto';
import { JwtPayloadType } from './types/JwtPayload';
import { RefreshTokensRequestDto } from './dtos/requests/refresh-tokens.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async createTokens(request: CreateTokensRequestDto) {
    const user = await this.userService.findByEmail(request.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.validatePassword(
      request.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.createToken(
      { email: user.email, sub: user.id },
      this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_MS'),
    );

    const refreshToken = this.createToken(
      { email: user.email, sub: user.id },
      this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      this.configService.get<string>('REFRESH_TOKEN_EXPIRATION_MS'),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(request: RefreshTokensRequestDto) {
    const payload = this.verifyToken(
      request.refreshToken,
      this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    );

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const accessToken = this.createToken(
      { email: user.email, sub: user.id },
      this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_MS'),
    );

    const refreshToken = this.createToken(
      { email: user.email, sub: user.id },
      this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      this.configService.get<string>('REFRESH_TOKEN_EXPIRATION_MS'),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  createToken(payload: object, secretKey: string, expiresIn: string): string {
    return sign(payload, secretKey, { expiresIn });
  }

  verifyToken(token: string, secretKey: string): JwtPayloadType | null {
    try {
      return verify(token, secretKey) as JwtPayloadType;
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string, secretKey: string): JwtPayloadType | null {
    try {
      return verify(token, secretKey) as JwtPayloadType;
    } catch (error) {
      return null;
    }
  }
}
