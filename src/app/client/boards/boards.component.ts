import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddListComponent } from '../modals/add-list/add-list.component';

@Component({
  selector: 'kt-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent {
  constructor(
    private modalService: BsModalService
  ) {}

  addList() {
    this.modalService.show(AddListComponent, { class: 'modal-md' })
  }
}
