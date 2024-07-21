import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddBoardComponent } from '../modals/add-board/add-board.component';
import { BoardState } from '../../core/states/board.state';
import { BoardService } from '../../core/services/board.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Board } from '../../shared/models/board.model';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'kt-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterContentInit {
  activeUser: User;

  boards: Board[];

  constructor(
    private modalService: BsModalService,
    private boardState: BoardState,
    private boardService: BoardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getActiveUser();
    this.getAllBoards();
  }

  ngAfterContentInit(): void {}

  addBoard() {
    this.modalService.show(AddBoardComponent, { class: 'modal-md' });
  }

  private getActiveUser() {
    this.authService.user$.subscribe((user) => (this.activeUser = user));
  }

  private getAllBoards() {
    this.boards = this.boardState.getAllBoards();
  }
}
