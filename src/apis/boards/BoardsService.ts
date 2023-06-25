import { Injectable, Scope } from '@nestjs/common';

import { Board } from './entities/BoardEntity';
import { IBoardServicesCreate } from './interfaces/IBoardsService';

/**
 * @Injectable({ scope: DEFALT})
 *
 * DEFAULT: 싱글톤 (최초 생성시 한번만 생성) - 디폴트 값
 * REQUEST: Request 올 떄마다 new 실행
 * TRANSIENT: DI될 떄마다 new 실행
 */
// @Injectable({ scope: Scope.Request })
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '점수',
        title: '제목1',
        contents: '내용1',
      },
      {
        number: 2,
        writer: '점수2',
        title: '제목2',
        contents: '내용2',
      },
      {
        number: 3,
        writer: '점수3',
        title: '제목3',
        contents: '내용3',
      },
    ];

    return result;
  }

  create({ createBoardInput }: IBoardServicesCreate): string {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    return '게시물 등록에 성공하였습니다';
  }
}
