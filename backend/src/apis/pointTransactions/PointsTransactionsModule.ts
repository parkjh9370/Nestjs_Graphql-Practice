import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PointsTransactionsResolver } from './PointsTransactionsResolver';
import { PointsTransactionsService } from './PointsTransactionsService';
import { PointTransaction } from './entities/PointTransactionEntity';
import { User } from '../users/entities/UserEntitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointsTransactionsResolver, //
    PointsTransactionsService,
  ],
})
export class PointsTransactionsModule {}
