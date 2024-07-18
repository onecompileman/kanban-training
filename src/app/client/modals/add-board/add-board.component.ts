import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'kt-add-board',
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.scss',
})
export class AddBoardComponent implements OnInit {
  boardColors: string[] = ['teal', 'purple', 'green', 'red', 'yellow'];

  boardForm: FormGroup;

  isSaving: boolean;

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
  }

  private initForm() {
    this.boardForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      color: [null, [Validators.required]],
    });
  }
}
