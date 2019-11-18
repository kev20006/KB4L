import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { subscription, board } from 'src/app/interfaces/interfaces';
import { BoardService } from 'src/app/services/board-service.service';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  private subscriptionInfo: subscription
  private boardList: board[];
  private boardCount: number = 0;
  private currentTasks: any[] = [];
  constructor(private user: UserService, private boardService: BoardService) {}

  ngOnInit() {
    this.user.subscription$.subscribe(data => {
      this.subscriptionInfo = data
      this.boardService.getBoardCount(`${this.user.tokenDecoded.user_id}`);
      this.boardService.getCurrentTasksByUser(`${this.user.tokenDecoded.user_id}`)
    });
    this.boardService.boardList$.subscribe(data => this.boardList = data);
    this.boardService.boardCount$.subscribe(data => this.boardCount = data);
    this.boardService.currentTasks$.subscribe(data => {
      console.log(data);
      this.currentTasks = data;
    })
  }
}
