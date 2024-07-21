import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColumnsService } from '../../../core/services/column.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'kt-add-list',
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss',
})
export class AddListComponent implements OnInit {

  boardId: string;

  listForm: FormGroup;

  isSaving: boolean;

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private columnService: ColumnsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
    const columnToAdd = this.listForm.getRawValue();
    columnToAdd.boardId = this.boardId;
    columnToAdd.order = 0;
    this.columnService.addColumns(columnToAdd).subscribe(
      () => {
        this.isSaving = false;
        this.toastrService.success('Added list successfully');
        this.modalRef.hide();
      },
      (error) => {
        this.toastrService.error(
          'Error occured adding the list, please contact admin or try again later.'
        );
      }
    )
  }

  private initForm() {
    this.listForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });
  }
}
