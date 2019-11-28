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

  public route: string;
  public board: board;
  public memberList: member[]
 

  constructor(
    public userService: UserService,
    public boardService: BoardService,
    public taskService: TaskService,
    public router: Router) {}
 
  ngOnInit() {
    this.route = this.router.url.split('/')[2]
    this.boardService.setBoardByUrl(this.route)
    this.boardService.currentBoard$.subscribe(data => this.board = data )
  }

  delete(){
    this.boardService.deleteBoard()
  }
}
