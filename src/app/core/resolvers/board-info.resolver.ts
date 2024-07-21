import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Board } from '../../shared/models/board.model';
import { BoardDataService } from '../data-services/board.data-service';
import { TaskService } from '../services/task.service';
import { ColumnsService } from '../services/column.service';
import { Task } from 'zone.js/lib/zone-impl';

@Injectable({
  providedIn: 'root',
})
export class BoardInfoResolver implements Resolve<Task[]> {
  constructor(
    private boardDataService: BoardDataService,
    private loaderService: LoaderService,
    private router: Router,
    private columnsService: ColumnsService,
    private taskService: TaskService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Task[]> {
    return this.boardDataService.getById(route.params['id']).pipe(
      catchError((error) => {
        this.router.navigate(['/client']);
        return of(null);
      }),
      switchMap((board) => this.columnsService.getAllColumnsByBoard(board.id)),
      switchMap((columns) =>
        this.taskService.getAllTasksByColumns(
          columns.map((column) => column.id)
        )
      ),
      tap(() => this.loaderService.loading$.next(false))
    );
  }
}
