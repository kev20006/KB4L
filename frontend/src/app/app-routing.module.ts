import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component'
import { LoginTestComponent } from './login-test/login-test.component'
import { ViewBoardComponent } from './view-board/view-board.component'
import { DashboardComponent } from './dashboard/dashboard.component'


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginTestComponent },
  { path: 'my-boards', component: DashboardComponent },
  { path: 'my-boards/:boardUrl', component: ViewBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
