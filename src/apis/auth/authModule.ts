import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/UserModule';
import { AuthResolver } from './AuthResolver';
import { AuthService } from './AuthService';
import { JwtAccessStrategy } from './strategies/JwtAccessStrategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserModule,
  ],
  providers: [
    JwtAccessStrategy, //
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
