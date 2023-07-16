import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/UserEntitity';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  exports: [
    UserService, //
  ],
  providers: [
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
