import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { BoardsListComponent } from './dashboard/boards-list/boards-list.component';

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

import { AuthInterceptor } from './auth.interceptor';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBoardComponent } from './view-board/view-board.component';
import { OpenModalButtonComponent, AddNewTaskDialog, AddNewBoardDialog } from './open-modal-button/open-modal-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { RecentActivityComponent } from './dashboard/recent-activity/recent-activity.component';
import { LoginTestComponent } from './login-test/login-test.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardsListComponent,
    IndexComponent,
    ViewBoardComponent,
    OpenModalButtonComponent,
    AddNewTaskDialog,
    AddNewBoardDialog,
    DashboardComponent,
    DashboardHeaderComponent,
    RecentActivityComponent,
    LoginTestComponent,
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
    MatChipsModule
  ],
  entryComponents: [
    AddNewTaskDialog,
    AddNewBoardDialog
  ],
  providers: [
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
