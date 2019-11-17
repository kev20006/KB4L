import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component'
import { RegisterComponent } from './components/login/register/register.component'
import { ViewBoardComponent } from './components/view-board/view-board.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AuthGuardService } from './guards/auth-guard.service'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-boards',
    component: DashboardComponent,
    canActivate: [AuthGuardService] },
  { path: 'my-boards/:boardUrl', component: ViewBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
