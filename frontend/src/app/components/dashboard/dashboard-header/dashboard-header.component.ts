import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { subscription, board } from 'src/app/interfaces/interfaces';
import { BoardService } from 'src/app/services/board-service.service';
import { Observable } from 'rxjs';

export interface personalTask {
  taskName: string;
  boardName: string;
  priority: number;
  score: number;
}

const DEMO_DATA: personalTask[] = [
  {
    taskName: "wash the dishes",
    boardName: "testBoard",
    priority: 1,
    score: 5
   },
  {
    taskName: "do some stuff",
    boardName: "board #2",
    priority: 3,
    score: 3
  },
  
];

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  private dataSource: personalTask[] = DEMO_DATA;
  private subscriptionInfo: subscription
  private boardList: board[];
  private boardCount: number = 0;
  private displayedColumns: string[] = ['taskName', 'boardName', 'priority', 'score'];
  constructor(private user: UserService, private boardService: BoardService) {}

  ngOnInit() {
    this.user.subscription$.subscribe(data => {
      this.subscriptionInfo = data
      this.boardService.getBoardCount(`${this.user.tokenDecoded.user_id}`);
    });
    this.boardService.boardList$.subscribe(data => (this.boardList = data));
    this.boardService.boardCount$.subscribe(data => (this.boardCount = data));
  }
}
