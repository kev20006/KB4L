import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../../services/board-service.service';
import { UserService } from '../../services/user.service'
import { board, member} from '../../interfaces/interfaces'
import { TaskService } from 'src/app/services/task.service';



@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {

  private route: string;
  private board: board;
  private memberList: member[]
 

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    private taskService: TaskService,
    private router: Router) {}
 
  ngOnInit() {
    this.route = this.router.url.split('/')[2]
    this.boardService.setBoardByUrl(this.route)
    this.boardService.currentBoard$.subscribe(data => this.board = data )
  }
}
