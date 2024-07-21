import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddListComponent } from '../modals/add-list/add-list.component';
import { ColumnsState } from '../../core/states/column.state';
import { Columns } from '../../shared/models/columns.model';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../shared/models/board.model';

@Component({
  selector: 'kt-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  columns: Columns[] = [];

  board: Board;

  constructor(
    private modalService: BsModalService,
    private columnState: ColumnsState,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.board = this.route.snapshot.data['board'];
    this.getColumns();
  }

  addList() {
    this.modalService.show(AddListComponent, { class: 'modal-md', initialState: {
      boardId: this.board.id
    }});
  }

  private getColumns() {
    this.columnState
      .selectAllColumnss()
      .subscribe((columns) => (this.columns = columns));
  }
}
