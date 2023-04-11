import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
