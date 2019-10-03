import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component'
import { BoardsListComponent } from './boards-list/boards-list.component';
import { ViewBoardComponent } from './view-board/view-board.component'


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'my-boards', component: BoardsListComponent },
  { path: 'my-boards/:boardUrl', component: ViewBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
