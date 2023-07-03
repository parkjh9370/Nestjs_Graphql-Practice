import { User } from '../../users/entities/UserEntitiy';

export interface IAuthServiceLogin {
  email: string;
  password: string;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}
