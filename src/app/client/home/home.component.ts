import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddBoardComponent } from '../modals/add-board/add-board.component';

@Component({
  selector: 'kt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.modalService.show(AddBoardComponent, { class: 'modal-md' })
  }
}
