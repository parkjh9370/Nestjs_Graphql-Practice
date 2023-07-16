import { IContext } from '../../../commons/interfaces/context';
import { User } from '../../users/entities/UserEntitity';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  context: IContext;
}
