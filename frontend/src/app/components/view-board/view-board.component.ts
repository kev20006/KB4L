import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../../services/board-service.service';
import { UserService } from '../../services/user.service'
import { board, member} from '../../interfaces/interfaces'



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
    private router: Router) {}
 
  ngOnInit() {
    console.log(this.boardService)
    this.route = this.router.url.split('/')[2]
    this.boardService.setBoardByUrl(this.route)
    this.boardService.currentBoard$.subscribe(data => this.board = data )
  }

  drop(event: CdkDragDrop<any>){
    let status = ""
    switch (event.container.id){
      case "todo":
        status = "1";
        break;
      case "inProgress":
        status = "2";
        break;
      case "completed":
        status = "3";
        break;
    }
    event.previousContainer.data[event.previousIndex].status = status
    console.log(event.previousContainer.data[event.previousIndex])
    this.boardService.updateTasksStatus(event.previousContainer.data[event.previousIndex])
  }

  isAdmin(){
    return this.boardService.memberList.some(element => {
      return element.username === this.userService.username && element.is_admin
    })
  }
}
