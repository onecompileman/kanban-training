import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskState {
  private task$: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  clearTask() {
    this.task$.next([]);
  }

  selectAllTasks(): Observable<Task[]> {
    return this.task$.asObservable();
  }

  selectAllTasksByColumnId(columnId: string): Observable<Task[]> {
    return this.task$
      .asObservable()
      .pipe(map((tasks) => tasks.filter((task) => task.columnId === columnId)));
  }

  getAllTasks(): Task[] {
    return this.task$.getValue();
  }

  getTaskById(id: string): Observable<Task> {
    return this.task$
      .asObservable()
      .pipe(map((tasks: Task[]) => tasks.find((b) => b.id === id)));
  }

  updateTask(task: Task) {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex((b) => b.id === task.id);

    tasks[taskIndex] = task;

    this.task$.next(tasks);
  }

  addTask(task: Task) {
    const tasks = this.getAllTasks();
    tasks.push(task);

    this.task$.next(tasks);
  }

  addTasks(tasksToAdd: Task[]) {
    const tasks = this.getAllTasks();
    tasks.push(...tasksToAdd);

    this.task$.next(tasks);
  }

  deleteTask(task: Task) {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex((b) => b.id === task.id);

    tasks.splice(taskIndex, 1);

    this.task$.next(tasks);
  }
}
