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
  public subscriptionInfo: subscription = {
    user: null,
    max_boards: null,
    subscription: false,
    sub_expires: null
  }
  public boardList: board[] = null;
  public boardCount: number = 0;
  public currentTasks: any[] = null;
  constructor(public user: UserService, public boardService: BoardService) {}

  ngOnInit() {
    this.user.subscription$.subscribe(data => {
      this.subscriptionInfo = data
      this.boardService.getBoardCount(`${this.user.tokenDecoded.user_id}`);
      this.boardService.getCurrentTasksByUser(`${this.user.tokenDecoded.user_id}`)
    });
    this.boardService.boardList$.subscribe(data => {
      this.boardList = data
    });
    this.boardService.boardCount$.subscribe(data => this.boardCount = data);
    this.boardService.currentTasks$.subscribe(data => {
      this.currentTasks = data;
    })
  }

  boardScoreTotal(boardList: board[]) {
      return boardList.map(board=> board.score).reduce((prev,next) => prev + next);
  }
}
