import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board-service.service';
import { Router } from '@angular/router';

import { task, board, taskList } from '../interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {
  
  private board: Observable<board>
  private title: string
  private route: string;
  private taskList: any;
  private inProgress: task[];

 

  constructor(private boardService: BoardService, private router: Router) {}
 
  ngOnInit() {
    this.route = this.router.url.split('/')[2]
    if (!this.boardService.boardSet){
      this.boardService.setBoardByUrl(this.route)
    }
    this.board = this.boardService.getCurrentBoard();
    console.log(this.board)
    this.taskList = this.boardService.getTasks();
  }
  testAdd(){
    this.boardService.addTask();
  }
}
