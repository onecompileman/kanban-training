import { Injectable } from '@angular/core';
import { BoardDataService } from '../data-services/board.data-service';
import { BoardState } from '../states/board.state';
import { Observable, switchMap, tap } from 'rxjs';
import { Board } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private boardDataService: BoardDataService,
    private boardState: BoardState
  ) {}

  getAllBoardsByUser(userId: string) {
    this.boardState.clearBoard();
    return this.boardDataService.getAllBoardByCreatedUser(userId).pipe(
      switchMap((boards: Board[]) => {
        this.boardState.addBoards(boards);
        return this.boardDataService
          .getAllBoardBySharedUser(userId)
          .pipe(tap((boards: Board[]) => this.boardState.addBoards(boards)));
      })
    );
  }

  updateBoard(board: Board): Observable<Board> {
    return this.boardDataService
      .updatedBoard(board)
      .pipe(tap((board) => this.boardState.updateBoard(board)));
  }

  addBoard(board: Board): Observable<Board> {
    return this.boardDataService
      .createBoard(board)
      .pipe(tap((board) => this.boardState.addBoard(board)));
  }

  deleteBoard(board: Board): Observable<Board> {
    return this.boardDataService
      .deleteBoard(board)
      .pipe(tap((board) => this.boardState.deleteBoard(board)));
  }
}
