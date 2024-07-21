import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getAllUser(
    search?: string,
    fieldSearch?: { [key: string]: string }
  ): Observable<User[]> {
    let httpParams = new HttpParams();
    if (search) httpParams = httpParams.append('search', search);
    for (const key in fieldSearch) {
      httpParams = httpParams.append(key, fieldSearch[key]);
    }
    return this.http.get<User[]>(environment.api + 'users', {
      params: httpParams,
    });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.api + 'users', user);
  }
}
