import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board-service.service';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {

  constructor(private boardService: BoardService) { }

  private board: any
  private tasks: any;
  async ngOnInit() {
    this.board = this.boardService.getCurrentBoard()
    this.boardService.getTasks(this.board.id).subscribe(
      data => this.tasks = data
    )
  }

}
