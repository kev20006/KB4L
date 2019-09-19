import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { BoardService } from '../board-service.service'

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {


  private boardList
  constructor(private userService: UserService, private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getBoard(this.userService.username).subscribe(
      data => this.boardList = data
    )
  }

}
