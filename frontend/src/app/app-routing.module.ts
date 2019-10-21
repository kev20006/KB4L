import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component'
import { LoginTestComponent } from './login/login-test/login-test.component'
import { RegisterComponent } from './login/register/register.component'
import { ViewBoardComponent } from './view-board/view-board.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthGuardService } from './auth-guard.service'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginTestComponent },
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
