import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { BoardService } from '../../../services/board-service.service'
import { board} from '../../../interfaces/interfaces'

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {

  public boardList: board[];
  constructor(public userService: UserService, public boardService: BoardService) { }

  ngOnInit() {
    this.userService.refreshToken();
    this.boardService.setBoardListByUser(this.userService.tokenDecoded.username)
    this.boardService.boardList$.subscribe(
      data => this.boardList = data
    )
  }

  setBoard(board){
    this.boardService.setBoard(board)
  }
}
