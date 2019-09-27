import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board-service.service';
import { Router } from '@angular/router';

import { task, board } from '../interfaces/interfaces'

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {
  
  private board: board 
  private title: string
  private route: string;
  private tasks: task[];

  constructor(private boardService: BoardService, private router: Router) {}
 
  ngOnInit() {
    this.route = this.router.url.split('/')[2]
    this.board = this.boardService.getCurrentBoard();
    if (this.board){
      this.boardService.getTasks(this.board.id).subscribe(
        data => this.tasks = data
      )
    }
    else{
      this.boardService.getBoardByUrl(this.route).subscribe(board => {
        this.board = board
        if (board.id >= 0){
          this.boardService.getTasks(this.board.id).subscribe(
            tasks => this.tasks = tasks
          )
        }
        else{
          this.board = null;
        }
      })
      this.title = this.board ? this.board.name : "Invalid Board, please check your url"
    }
  } 
}
