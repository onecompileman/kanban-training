import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BoardService } from '../services/board.service';
import { Board } from '../../shared/models/board.model';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class BoardListResolver implements Resolve<Board[]> {
  constructor(
    private authService: AuthService,
    private boardService: BoardService,
    private loaderService: LoaderService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Board[]> {
    const activeUser = this.authService.user$.getValue();
    return this.boardService.getAllBoardsByUser(activeUser.id).pipe(
      catchError(() => of([])),
      tap(() => this.loaderService.loading$.next(false))
    );
  }
}
