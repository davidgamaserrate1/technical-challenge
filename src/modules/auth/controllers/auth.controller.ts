import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto ) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    return await this.authService.login(user);
  }
}
