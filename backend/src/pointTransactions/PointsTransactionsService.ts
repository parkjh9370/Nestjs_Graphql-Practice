import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../apis/users/entities/UserEntitity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/PointTransactionEntity';

import { IPointsTransactionsServiceCreate } from './interfaces/PointsTransactionsService';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // 1. PointTransaction 테이블에 거래기록 생성
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointsTransactionsRepository.save(pointTransaction);

    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 브라우저에 돌려주기
    return pointTransaction;
  }
}
