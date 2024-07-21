import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BoardService } from '../../../core/services/board.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'kt-add-board',
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.scss',
})
export class AddBoardComponent implements OnInit {
  boardColors: string[] = ['teal', 'purple', 'green', 'red', 'yellow'];

  boardForm: FormGroup;

  isSaving: boolean;

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private boardService: BoardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.isSaving = true;
    const boardToAdd = this.boardForm.getRawValue();
    const activeUser = this.authService.user$.getValue();
    boardToAdd.createdBy = activeUser.id;
    this.boardService.addBoard(boardToAdd).subscribe(
      () => {
        this.isSaving = false;
        this.toastrService.success('Added board successfully');
        this.modalRef.hide();
      },
      (error) => {
        this.toastrService.error(
          'Error occured adding the board, please contact admin or try again later.'
        );
      }
    );
  }

  private initForm() {
    this.boardForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      color: [null, [Validators.required]],
    });
  }
}
