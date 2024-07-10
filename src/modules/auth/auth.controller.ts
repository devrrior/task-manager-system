import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokensRequestDto } from './dtos/requests/create-tokens.request.dto';
import { RefreshTokensRequestDto } from './dtos/requests/refresh-tokens.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tokens')
  async createTokens(@Body() request: CreateTokensRequestDto) {
    const data = await this.authService.createTokens(request);
    return {
      data: data,
      success: true,
      message: 'Tokens created',
    };
  }

  @Post('tokens/refresh')
  async refreshTokens(@Body() request: RefreshTokensRequestDto) {
    const data = await this.authService.refreshTokens(request);
    return {
      data: data,
      success: true,
      message: 'Tokens refreshed',
    };
  }
}
