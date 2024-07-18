import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddBoardComponent } from './modals/add-board/add-board.component';

@Component({
  selector: 'kt-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.modalService.show(AddBoardComponent, { class: 'modal-md' })
  }
}
