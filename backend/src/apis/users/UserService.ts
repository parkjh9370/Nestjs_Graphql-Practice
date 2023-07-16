import * as bcrypt from 'bcrypt';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/UserEntitity';
import {
  IUserServiceCreate,
  IUserServiceFindOneByEmail,
} from './interfaces/UserInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUserServiceFindOneByEmail): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUserServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    const hasedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      email,
      password: hasedPassword,
      name,
      age,
    });
  }
}
