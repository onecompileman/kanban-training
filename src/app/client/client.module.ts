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

@NgModule({
  declarations: [
    HomeComponent,
    BoardsComponent,
    AddListComponent,
    AddBoardComponent,
    AddTaskComponent,
    ClientComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
