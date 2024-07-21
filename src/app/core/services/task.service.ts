import { Injectable } from '@angular/core';
import { TaskDataService } from '../data-services/task.data-service';
import { TaskState } from '../states/task.state';
import { catchError, Observable, of, switchMap, tap, zip } from 'rxjs';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private taskDataService: TaskDataService,
    private taskState: TaskState
  ) {}

  getAllTasksByColumns(columnIds: string[]) {
    this.taskState.clearTask();

    if (columnIds.length === 0) return of([]);

    const tasksByColumns$ = columnIds.map((columnId) =>
      this.taskDataService.getAllByColumnId(columnId).pipe(catchError(() => of([])))
    );

    return zip(tasksByColumns$).pipe(
      tap((tasks: Task[][]) => this.taskState.addTasks(tasks.flat(1)))
    );
  }

  updateTask(task: Task): Observable<Task> {
    this.taskState.updateTask(task);
    return this.taskDataService
      .updatedTask(task)
      .pipe(tap((task) => this.taskState.updateTask(task)));
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDataService
      .createTask(task)
      .pipe(tap((task) => this.taskState.addTask(task)));
  }

  deleteTask(task: Task): Observable<Task> {
    return this.taskDataService
      .deleteTask(task)
      .pipe(tap((task) => this.taskState.deleteTask(task)));
  }
}
