import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'kt-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup;

  isSaving: boolean;

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  get subtasksControls(): FormGroup[] {
    return (this.taskForm.get('subtasks') as FormArray).controls as FormGroup[];
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
      subtasks: this.formBuilder.array([]),
    });

    this.addSubtasks();
    this.addSubtasks();
  }
}
