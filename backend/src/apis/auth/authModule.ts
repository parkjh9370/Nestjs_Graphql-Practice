import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/UserModule';
import { AuthResolver } from './authResolver';
import { AuthService } from './authService';
import { JwtAccessStrategy } from './strategies/JwtAccessStrategy';
import { JwtRefreshStrategy } from './strategies/JwtRefreshStrategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserModule,
  ],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
