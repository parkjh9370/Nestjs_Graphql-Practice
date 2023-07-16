import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/UserEntitity';
import { UserService } from './UserService';
import { GqlAuthGuard } from '../auth/guard/GqlAuthGuard';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchUser(): string {
    console.log('인가에 성공하였습니다');
    return '인가에 성공하였습니다.';
  }

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
