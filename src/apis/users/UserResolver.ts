import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/UserEntitiy';
import { UserService } from './UserService';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.userService.create({ email, password, name, age });
  }
}
