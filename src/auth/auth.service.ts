import { UserEntity } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: Partial<UserEntity>) {

    const allInformationUser = await this.usersService.getMe(user.id || "");

    const payload = {
      id: user.id,
      user: allInformationUser
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(
    username: string,
    userPassword: string,
  ): Promise<Partial<UserEntity> | null | undefined> {
    let user: UserEntity | null;

    try {
      user = await this.usersService.getByUsername(username);
      if (user) {
        // Encrypt the password to compare
        const passwordIsValid = compareSync(userPassword, user.password);

        if (!passwordIsValid) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
    } catch (error) {
      return null;
    }
  }
}
