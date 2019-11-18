import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { BoardsListComponent } from './components/dashboard/boards-list/boards-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

//third party library https://github.com/Bartosz-D3V/ng-payment-card
import { NgPaymentCardModule } from 'ng-payment-card';

import { AuthInterceptor } from './auth.interceptor';
import { IndexComponent } from './components/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBoardComponent } from './components/view-board/view-board.component';
import {
  OpenModalButtonComponent,
  AddNewTaskDialog,
  AddNewBoardDialog,
  AddNewMembersDialog,
  PaymentOptionsDialog,
  CardPaymentDialog,
} from './components/open-modal-button/open-modal-button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { RecentActivityComponent } from './components/dashboard/recent-activity/recent-activity.component';
import { LoginTestComponent } from './components/login/login-test/login-test.component';
import { RegisterComponent } from './components/login/register/register.component';
import { RegisterModalComponent } from './components/login/register/register.modal.component';
import { BoardComponent } from './components/view-board/board/board.component';
import { TaskComponent } from './components/view-board/task/task.component';



@NgModule({
  declarations: [
    AppComponent,
    BoardsListComponent,
    IndexComponent,
    ViewBoardComponent,
    OpenModalButtonComponent,
    AddNewTaskDialog,
    AddNewBoardDialog,
    AddNewMembersDialog,
    DashboardComponent,
    DashboardHeaderComponent,
    RecentActivityComponent,
    LoginTestComponent,
    RegisterComponent,
    RegisterModalComponent,
    BoardComponent,
    TaskComponent,
    PaymentOptionsDialog,
    CardPaymentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatBadgeModule,
    NgPaymentCardModule,
  ],
  entryComponents: [
    AddNewTaskDialog,
    AddNewBoardDialog,
    AddNewMembersDialog,
    LoginTestComponent,
    RegisterModalComponent,
    PaymentOptionsDialog,
    CardPaymentDialog,
  ],
  providers: [
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
