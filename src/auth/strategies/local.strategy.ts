import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Define default values that 'passport' will understand
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // Function called automatically by passport
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) throw new UnauthorizedException('Username ou senha inválidos! Tente novamente.');

    return user;
  }
}
