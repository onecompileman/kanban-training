import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'kt-add-list',
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss',
})
export class AddListComponent implements OnInit {

  listForm: FormGroup;

  isSaving: boolean;

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
  }

  private initForm() {
    this.listForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }
}
