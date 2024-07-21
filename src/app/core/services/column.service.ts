import { Injectable } from '@angular/core';
import { ColumnsDataService } from '../data-services/column.data-service';
import { ColumnsState } from '../states/column.state';
import { Observable, switchMap, tap } from 'rxjs';
import { Columns } from '../../shared/models/columns.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(
    private columnsDataService: ColumnsDataService,
    private columnsState: ColumnsState
  ) {}

  getAllColumnsByBoard(boardId: string) {
    this.columnsState.clearColumns();
    return this.columnsDataService
      .getAllByBoardId(boardId)
      .pipe(
        tap((columnss: Columns[]) => this.columnsState.addColumnss(columnss))
      );
  }

  updateColumns(columns: Columns): Observable<Columns> {
    return this.columnsDataService
      .updatedColumns(columns)
      .pipe(tap((columns) => this.columnsState.updateColumns(columns)));
  }

  addColumns(columns: Columns): Observable<Columns> {
    return this.columnsDataService
      .createColumns(columns)
      .pipe(tap((columns) => this.columnsState.addColumns(columns)));
  }

  deleteColumns(columns: Columns): Observable<Columns> {
    return this.columnsDataService
      .deleteColumns(columns)
      .pipe(tap((columns) => this.columnsState.deleteColumns(columns)));
  }
}
