import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './authService';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ): Promise<string> {
    return this.authService.login({ email, password });
  }
}
