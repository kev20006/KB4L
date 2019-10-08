import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'
import { BoardService } from '../../board-service.service'
import { Observable } from 'rxjs';
import { board} from '../../interfaces/interfaces'
@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {


  private boardList: board[];
  constructor(private userService: UserService, private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getBoard("admin").subscribe(
      data => this.boardList = data
    )
  }

  setBoard(board){
    this.boardService.setBoard(board)
  }
}
