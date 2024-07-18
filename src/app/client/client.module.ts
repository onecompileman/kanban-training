import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { BoardsComponent } from './boards/boards.component';
import { AddListComponent } from './modals/add-list/add-list.component';
import { AddBoardComponent } from './modals/add-board/add-board.component';
import { AddTaskComponent } from './modals/add-task/add-task.component';
import { ClientComponent } from './client.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListComponent } from './boards/list/list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    HomeComponent,
    BoardsComponent,
    AddListComponent,
    AddBoardComponent,
    AddTaskComponent,
    ClientComponent,
    NavbarComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class ClientModule { }
