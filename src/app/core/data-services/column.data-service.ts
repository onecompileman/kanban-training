import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Columns } from '../../shared/models/columns.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsDataService {
  constructor(private http: HttpClient) {}

  getAllColumns(
    search?: string,
    fieldSearch?: { [key: string]: string }
  ): Observable<Columns[]> {
    let httpParams = new HttpParams();
    if (search) httpParams = httpParams.append('search', search);
    for (const key in fieldSearch) {
      httpParams = httpParams.append(key, fieldSearch[key]);
    }
    return this.http.get<Columns[]>(environment.api + 'columns', {
      params: httpParams,
    });
  }

  getById(id: string): Observable<Columns> {
    return this.http.get<Columns>(environment.api + 'columns/' + id);
  }

  getAllByBoardId(boardId: string): Observable<Columns[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('boardId', boardId);
    return this.http.get<Columns[]>(environment.api + 'columns', {
      params: httpParams,
    });
  }


  createColumns(columns: Columns): Observable<Columns> {
    return this.http.post<Columns>(environment.api + 'columns', columns);
  }

  updatedColumns(columns: Columns): Observable<Columns> {
    return this.http.put<Columns>(environment.api + 'columns/' + columns.id, columns);
  }

  deleteColumns(columns: Columns): Observable<Columns> {
    return this.http.delete<Columns>(environment.api + 'columns/' + columns.id);
  }
}
