import * as bcrypt from 'bcrypt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/UserService';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/authServiceLogin';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    const user = await this.userService.findOneByEmail({ email });
    if (!user) {
      throw new UnprocessableEntityException(
        '등록되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.',
      );
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException(
        '등록되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.',
      );
    }

    return this.issueAccessToken({ user });
  }

  issueAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'my-secret-key', expiresIn: '1h' },
    );
  }
}
