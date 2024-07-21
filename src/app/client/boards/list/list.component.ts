import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddTaskComponent } from '../../modals/add-task/add-task.component';
import { Columns } from '../../../shared/models/columns.model';
import { Task } from '../../../shared/models/task.model';
import { TaskState } from '../../../core/states/task.state';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'kt-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @Input() column: Columns;

  tasks: Task[] = [];

  constructor(
    private modalService: BsModalService,
    private taskState: TaskState,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event, this.column);

    const taskToUpdate = {
      ...event.item.data,
      order: event.currentIndex,
      columnId: this.column.id
    }

    this.taskService.updateTask(taskToUpdate).subscribe();
  }

  addTask() {
    this.modalService.show(AddTaskComponent, {
      class: 'modal-md',
      initialState: { columnId: this.column.id },
    });
  }

  private getTasks() {
    this.taskState
      .selectAllTasksByColumnId(this.column.id)
      .subscribe((tasks) => (this.tasks = tasks));
  }
}
