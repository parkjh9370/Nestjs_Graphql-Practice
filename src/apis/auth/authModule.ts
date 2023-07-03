import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/UserModule';
import { AuthResolver } from './authResolver';
import { AuthService } from './authService';

@Module({
  imports: [
    JwtModule.register({}), //
    UserModule,
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
