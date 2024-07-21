import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'kt-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  columnId: string;

  taskForm: FormGroup;

  isSaving: boolean;

  constructor(
    public modalRef: BsModalRef,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
    const taskToAdd = this.taskForm.getRawValue();
    taskToAdd.columnId = this.columnId;
    taskToAdd.order = 0;
    this.taskService.addTask(taskToAdd).subscribe(
      () => {
        this.isSaving = false;
        this.toastrService.success('Added task successfully');
        this.modalRef.hide();
      },
      (error) => {
        this.toastrService.error(
          'Error occured adding the task, please contact admin or try again later.'
        );
      }
    );
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subTasks') as FormArray;
  }

  get subtasksControls(): FormGroup[] {
    return (this.taskForm.get('subTasks') as FormArray).controls as FormGroup[];
  }

  addSubtasks() {
    this.subtasks.push(
      this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  private initForm() {
    this.taskForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      subTasks: this.formBuilder.array([]),
    });

    this.addSubtasks();
    this.addSubtasks();
  }
}
