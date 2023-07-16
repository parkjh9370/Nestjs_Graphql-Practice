import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { KakaoStrategy } from 'passport-kakao';
// import { NaverStrategy } from 'passport-naver';
// import { GoogleStrategy } from 'passport-google';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        // console.log(req);
        const cookie = req.headers.cookie; // refreshToken=asdlkfjqlkjwfdjkl
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'my-refresh-secret-key',
    });
  }

  validate(payload) {
    // console.log(payload);

    return {
      id: payload.sub,
    };
  }
}
