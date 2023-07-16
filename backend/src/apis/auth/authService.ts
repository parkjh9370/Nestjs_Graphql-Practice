import * as bcrypt from 'bcrypt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/UserService';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/authServiceLogin';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    for (const c in context) {
      console.log(`context: ${JSON.stringify(c, null, '\t')}`);
    }

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

    this.setRefreshToken({ user, context });

    return this.issueAccessToken({ user });
  }

  /**
   * accessToken: 응답 객체 (payload)
   * refreshToken: 응답 쿠키 (헤더 쿠키 셋팅을 통해)
   */
  issueAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'my-secret-key', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'my-refresh-secret-key', expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경 (보안 관련 옵션 추가)
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.issueAccessToken({ user });
  }
}
