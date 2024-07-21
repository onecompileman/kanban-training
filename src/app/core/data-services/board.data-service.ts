import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Board } from '../../shared/models/board.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardDataService {
  constructor(private http: HttpClient) {}

  getAllBoard(
    search?: string,
    fieldSearch?: { [key: string]: string }
  ): Observable<Board[]> {
    let httpParams = new HttpParams();
    if (search) httpParams = httpParams.append('search', search);
    for (const key in fieldSearch) {
      httpParams = httpParams.append(key, fieldSearch[key]);
    }
    return this.http.get<Board[]>(environment.api + 'boards', {
      params: httpParams,
    });
  }

  getById(id: string): Observable<Board> {
    return this.http.get<Board>(environment.api + 'boards/' + id);
  }

  getAllBoardByCreatedUser(userId: string): Observable<Board[]> {
    console.log(userId);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('createdBy', userId);
    return this.http.get<Board[]>(environment.api + 'boards', {
      params: httpParams,
    });
  }

  getAllBoardBySharedUser(userId: string): Observable<Board[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('sharedToUserIds', userId);
    console.log(httpParams);
    return this.http.get<Board[]>(environment.api + 'boards', {
      params: httpParams,
    });
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(environment.api + 'boards', board);
  }

  updatedBoard(board: Board): Observable<Board> {
    return this.http.put<Board>(environment.api + 'boards/' + board.id, board);
  }

  deleteBoard(board: Board): Observable<Board> {
    return this.http.delete<Board>(environment.api + 'boards/' + board.id);
  }
}
