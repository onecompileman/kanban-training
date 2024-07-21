import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Columns } from '../../shared/models/columns.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnsState {
  private columns$: BehaviorSubject<Columns[]> = new BehaviorSubject([]);

  clearColumns() {
    this.columns$.next([]);
  }

  selectAllColumnss(): Observable<Columns[]> {
    return this.columns$.asObservable();
  }

  getAllColumnss(): Columns[] {
    return this.columns$.getValue();
  }

  getColumnsById(id: string): Observable<Columns> {
    return this.columns$
      .asObservable()
      .pipe(map((columnss: Columns[]) => columnss.find((b) => b.id === id)));
  }

  updateColumns(columns: Columns) {
    const columnss = this.getAllColumnss();
    const columnsIndex = columnss.findIndex((b) => b.id === columns.id);

    columnss[columnsIndex] = columns;

    this.columns$.next(columnss);
  }

  addColumns(columns: Columns) {
    const columnss = this.getAllColumnss();
    columnss.push(columns);

    this.columns$.next(columnss);
  }

  addColumnss(columnssToAdd: Columns[]) {
    const columnss = this.getAllColumnss();
    columnss.push(...columnssToAdd);

    this.columns$.next(columnss);
  }

  deleteColumns(columns: Columns) {
    const columnss = this.getAllColumnss();
    const columnsIndex = columnss.findIndex((b) => b.id === columns.id);

    columnss.splice(columnsIndex, 1);

    this.columns$.next(columnss);
  }
}
