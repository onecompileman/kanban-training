import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { BoardListResolver } from '../core/resolvers/board-list.resolver';
import { BoardInfoResolver } from '../core/resolvers/board-info.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: {
          boards: BoardListResolver
        }
      },
      {
        path: 'board/:id',
        component: BoardsComponent,
        resolve: {
          board: BoardInfoResolver
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
