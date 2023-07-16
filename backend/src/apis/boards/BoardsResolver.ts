import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BoardsService } from './BoardsService';
import { Board } from './entities/BoardEntity';
import { CreateBoardInput } from './dto/CreateBoardInput';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String, { nullable: true })
  createBoard(
    // @Args({ name: 'writer', nullable: true }) writer: string,
    // @Args({ name: 'title', nullable: true }) title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
