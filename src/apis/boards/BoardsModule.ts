import { Module } from '@nestjs/common';

import { BoardsResolver } from './BoardsResolver';
import { BoardsService } from './BoardsService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/BoardEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoradsModule {}
