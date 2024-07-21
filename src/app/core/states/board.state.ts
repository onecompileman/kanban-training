import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Board } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardState {
  private board$: BehaviorSubject<Board[]> = new BehaviorSubject([]);

  clearBoard() {
    this.board$.next([]);
  }

  selectAllBoards(): Observable<Board[]> {
    return this.board$.asObservable();
  }

  getAllBoards(): Board[] {
    return this.board$.getValue();
  }

  getBoardById(id: string): Observable<Board> {
    return this.board$
      .asObservable()
      .pipe(map((boards: Board[]) => boards.find((b) => b.id === id)));
  }

  updateBoard(board: Board) {
    const boards = this.getAllBoards();
    const boardIndex = boards.findIndex((b) => b.id === board.id);

    boards[boardIndex] = board;

    this.board$.next(boards);
  }

  addBoard(board: Board) {
    const boards = this.getAllBoards();
    boards.push(board);

    this.board$.next(boards);
  }

  addBoards(boardsToAdd: Board[]) {
    const boards = this.getAllBoards();
    boards.push(...boardsToAdd);

    this.board$.next(boards);
  }

  deleteBoard(board: Board) {
    const boards = this.getAllBoards();
    const boardIndex = boards.findIndex((b) => b.id === board.id);

    boards.splice(boardIndex, 1);

    this.board$.next(boards);
  }
}
