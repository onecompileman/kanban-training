import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Task } from '../../shared/models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  constructor(private http: HttpClient) {}

  getAllTask(
    search?: string,
    fieldSearch?: { [key: string]: string }
  ): Observable<Task[]> {
    let httpParams = new HttpParams();
    if (search) httpParams = httpParams.append('search', search);
    for (const key in fieldSearch) {
      httpParams = httpParams.append(key, fieldSearch[key]);
    }
    return this.http.get<Task[]>(environment.api + 'tasks', {
      params: httpParams,
    });
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(environment.api + 'tasks/' + id);
  }

  getAllByColumnId(columnId: string): Observable<Task[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('columnId', columnId);
    return this.http.get<Task[]>(environment.api + 'tasks', {
      params: httpParams,
    });
  }


  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.api + 'tasks', task);
  }

  updatedTask(task: Task): Observable<Task> {
    return this.http.put<Task>(environment.api + 'tasks/' + task.id, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(environment.api + 'tasks/' + task.id);
  }
}
