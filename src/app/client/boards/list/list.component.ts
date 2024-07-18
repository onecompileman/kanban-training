import { Component, Input} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddTaskComponent } from '../../modals/add-task/add-task.component';

@Component({
  selector: 'kt-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() item: number;

  constructor(private modalService: BsModalService) {}

  addTask() {
    this.modalService.show(AddTaskComponent, { class: 'modal-md'});
  }
}
